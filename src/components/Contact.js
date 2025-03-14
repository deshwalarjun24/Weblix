import React, { useState, useEffect } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: '',
    loading: false
  });

  const [offlineMode, setOfflineMode] = useState({
    isOffline: false,
    pendingMessages: []
  });

  // Check for pending messages in localStorage on component mount
  useEffect(() => {
    // Check for pending messages in localStorage
    const storedMessages = localStorage.getItem('pendingMessages');
    if (storedMessages) {
      const messages = JSON.parse(storedMessages);
      
      setOfflineMode(prev => ({
        ...prev,
        pendingMessages: messages
      }));
      
      // Try to sync pending messages if we're online
      if (navigator.onLine) {
        syncPendingMessages();
      }
    }
    
    // Add event listeners for online/offline status
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Set initial offline status
    setOfflineMode(prev => ({
      ...prev,
      isOffline: !navigator.onLine
    }));
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Handle when browser goes online
  const handleOnline = () => {
    setOfflineMode(prev => ({
      ...prev,
      isOffline: false
    }));
    
    // Try to sync pending messages
    if (offlineMode.pendingMessages.length > 0) {
      syncPendingMessages();
    }
  };
  
  // Handle when browser goes offline
  const handleOffline = () => {
    setOfflineMode(prev => ({
      ...prev,
      isOffline: true
    }));
  };
  
  // Sync pending messages with the server
  const syncPendingMessages = async () => {
    if (offlineMode.pendingMessages.length === 0) return;
    
    setFormStatus(prev => ({
      ...prev,
      message: 'Syncing pending messages...',
      loading: true
    }));
    
    const newPendingMessages = [...offlineMode.pendingMessages];
    
    for (let i = 0; i < newPendingMessages.length; i++) {
      const message = newPendingMessages[i];
      try {
        const response = await fetch('http://localhost/Weblix/api/contact.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(message)
        });
        
        const result = await response.json();
        
        if (result.status === 'success') {
          // Remove this message from pending messages
          newPendingMessages.splice(i, 1);
          i--; // Adjust index since we removed an item
          
          setFormStatus({
            submitted: true,
            error: false,
            message: `Synced message from ${message.name}`,
            loading: true
          });
        }
      } catch (error) {
        console.error('Error syncing message:', error);
        // If we can't sync, stop trying for now
        break;
      }
    }
    
    // Update pending messages in state and localStorage
    setOfflineMode(prev => ({
      ...prev,
      pendingMessages: newPendingMessages
    }));
    localStorage.setItem('pendingMessages', JSON.stringify(newPendingMessages));
    
    if (newPendingMessages.length === 0) {
      setFormStatus({
        submitted: true,
        error: false,
        message: 'All messages synced successfully!',
        loading: false
      });
    } else {
      setFormStatus({
        submitted: true,
        error: false,
        message: `Synced some messages. ${newPendingMessages.length} still pending.`,
        loading: false
      });
    }
    
    // Reset form status after 5 seconds
    setTimeout(() => {
      setFormStatus(prev => ({
        ...prev,
        message: ''
      }));
    }, 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitted: false,
        error: true,
        message: 'Please fill in all fields',
        loading: false
      });
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        submitted: false,
        error: true,
        message: 'Please enter a valid email address',
        loading: false
      });
      return;
    }
    
    // Set loading state
    setFormStatus({
      ...formStatus,
      loading: true
    });
    
    // If we're offline or in offline mode, store the message locally
    if (offlineMode.isOffline) {
      // Add timestamp to the message
      const messageWithTimestamp = {
        ...formData,
        timestamp: new Date().toISOString()
      };
      
      // Add to pending messages
      const newPendingMessages = [...offlineMode.pendingMessages, messageWithTimestamp];
      setOfflineMode(prev => ({
        ...prev,
        pendingMessages: newPendingMessages
      }));
      
      // Store in localStorage
      localStorage.setItem('pendingMessages', JSON.stringify(newPendingMessages));
      
      // Update status
      setFormStatus({
        submitted: true,
        error: false,
        message: 'Message saved offline. It will be sent when you reconnect.',
        loading: false
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      // Reset form status after 5 seconds
      setTimeout(() => {
        setFormStatus(prev => ({
          ...prev,
          message: ''
        }));
      }, 5000);
      
      return;
    }
    
    try {
      // Send data to PHP backend
      const response = await fetch('http://localhost/Weblix/api/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (result.status === 'success') {
        // Success response
        setFormStatus({
          submitted: true,
          error: false,
          message: result.message,
          loading: false
        });
        
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        // Error response
        setFormStatus({
          submitted: false,
          error: true,
          message: result.message || 'Something went wrong. Please try again later.',
          loading: false
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Network or server error - switch to offline mode
      setOfflineMode(prev => ({
        ...prev,
        isOffline: true
      }));
      
      // Store message for later
      const messageWithTimestamp = {
        ...formData,
        timestamp: new Date().toISOString()
      };
      
      // Add to pending messages
      const newPendingMessages = [...offlineMode.pendingMessages, messageWithTimestamp];
      setOfflineMode(prev => ({
        ...prev,
        pendingMessages: newPendingMessages
      }));
      
      // Store in localStorage
      localStorage.setItem('pendingMessages', JSON.stringify(newPendingMessages));
      
      // Update status
      setFormStatus({
        submitted: true,
        error: false,
        message: 'Server is unavailable. Message saved offline and will be sent later.',
        loading: false
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    }
    
    // Reset form status after 5 seconds
    setTimeout(() => {
      setFormStatus(prevStatus => ({
        ...prevStatus,
        message: ''
      }));
    }, 5000);
  };

  return (
    <section id="contact" className="contact">
      <div className="section-title">
        <h2>Contact Us</h2>
        <p>Get in touch with our team for any inquiries or project discussions</p>
      </div>
      
      {offlineMode.isOffline && (
        <div className="offline-notice">
          <p>You are currently offline. Messages will be saved and sent when you reconnect.</p>
          {offlineMode.pendingMessages.length > 0 && (
            <p>You have {offlineMode.pendingMessages.length} pending message(s).</p>
          )}
        </div>
      )}
      
      {!offlineMode.isOffline && offlineMode.pendingMessages.length > 0 && (
        <div className="pending-messages-notice">
          <p>You have {offlineMode.pendingMessages.length} pending message(s) to sync.</p>
          <button 
            className="btn-secondary"
            onClick={syncPendingMessages}
            disabled={formStatus.loading}
          >
            Sync Now
          </button>
        </div>
      )}
      
      <div className="contact-container">
        <div className="contact-info">
          <div className="contact-info-item">
            <i className="fas fa-envelope"></i>
            <div>
              <h3>Email Us</h3>
              <p>info@weblix.com</p>
            </div>
          </div>
          
          <div className="contact-info-item">
            <i className="fas fa-phone-alt"></i>
            <div>
              <h3>Call Us</h3>
              <p>+1 234 567 8900</p>
            </div>
          </div>
          
          <div className="contact-social">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
        
        <div className="contact-form-container">
          {formStatus.message && (
            <div className={`form-message ${formStatus.error ? 'error' : 'success'}`}>
              {formStatus.message}
            </div>
          )}
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                disabled={formStatus.loading}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                disabled={formStatus.loading}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your message"
                rows="5"
                disabled={formStatus.loading}
              ></textarea>
            </div>
            
            <button type="submit" className="btn-primary" disabled={formStatus.loading}>
              {formStatus.loading ? (
                <>Sending... <i className="fas fa-spinner fa-spin"></i></>
              ) : offlineMode.isOffline ? (
                <>Save Offline <i className="fas fa-save"></i></>
              ) : (
                <>Send Message <i className="fas fa-paper-plane"></i></>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact; 