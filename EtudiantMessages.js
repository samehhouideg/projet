// src/pages/EtudiantMessages.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DB } from '../data';
import EtudiantSidebar from '../components/EtudiantSidebar';

function EtudiantMessages() {
  const navigate = useNavigate();

  // المستخدم الحالي (من المفترض أنه الطالب المسجل)
  const currentUserId = 2; // Sameh (يمكنك تغيير هذا حسب تسجيل الدخول)
  
  // جلب جميع المستخدمين الآخرين (جهات الاتصال)
  const contacts = DB.users.filter(u => u.id !== currentUserId);
  
  // حالة المحادثة
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  
  // جلب جميع الرسائل
  const allMessages = DB.messages || [];

  // تصفية الرسائل الخاصة بالمحادثة الحالية
  const getConversation = (contactId) => {
    return allMessages.filter(msg => 
      (msg.senderId === currentUserId && msg.receiverId === contactId) ||
      (msg.senderId === contactId && msg.receiverId === currentUserId)
    );
  };

  // الحصول على اسم جهة الاتصال
  const getContactName = (contactId) => {
    const user = DB.users.find(u => u.id === contactId);
    return user ? user.name : 'Inconnu';
  };

  // دالة إرسال رسالة جديدة
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!selectedContactId || newMessage.trim() === '') return;

    const newMsg = {
      id: allMessages.length + 1,
      senderId: currentUserId,
      receiverId: selectedContactId,
      content: newMessage,
      timestamp: new Date().toISOString()
    };

    // حفظ في قاعدة البيانات
    DB.messages.push(newMsg);
    // تحديث الحالة لإعادة التحميل (أسلوب بسيط)
    window.location.reload(); 
  };

  // تنسيق الوقت
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif", background: '#f8fafc' }}>
      <EtudiantSidebar activeTab="messages" />
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '32px 40px', overflow: 'hidden' }}>
        
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}>Messages</h1>
          <p style={{ fontSize: '15px', color: '#64748b' }}>Chat privé et forum. Communiquez avec vos professeurs et camarades.</p>
        </div>

        {/* واجهة المحادثة (مقسمة إلى عمودين) */}
        <div style={{ display: 'flex', flex: 1, background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', minHeight: '500px' }}>
          
          {/* القائمة اليسرى: جهات الاتصال */}
          <div style={{ width: '280px', borderRight: '1px solid #e2e8f0', padding: '16px', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#0f172a', marginBottom: '16px' }}>Contacts</h3>
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {contacts.map(contact => (
                <div 
                  key={contact.id}
                  onClick={() => setSelectedContactId(contact.id)}
                  style={{ 
                    padding: '12px 16px', 
                    borderRadius: '8px', 
                    cursor: 'pointer',
                    background: selectedContactId === contact.id ? '#f8f7ff' : 'transparent',
                    border: selectedContactId === contact.id ? '1px solid #6C63FF' : '1px solid transparent',
                    marginBottom: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <div style={{ 
                    width: '36px', height: '36px', borderRadius: '50%', 
                    background: selectedContactId === contact.id ? '#6C63FF' : '#e2e8f0',
                    color: selectedContactId === contact.id ? '#fff' : '#64748b',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px'
                  }}>
                    {contact.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: '500', color: '#0f172a' }}>{contact.name}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>{contact.role === 'professeur' ? '👨‍🏫 Professeur' : contact.role === 'admin' ? '👤 Admin' : '🎓 Étudiant'}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* القائمة اليمنى: نافذة المحادثة */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px', background: '#fafafa' }}>
            {selectedContactId ? (
              <>
                {/* رأس المحادثة */}
                <div style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ fontWeight: '600', color: '#0f172a', fontSize: '16px' }}>
                    💬 {getContactName(selectedContactId)}
                  </div>
                </div>

                {/* منطقة الرسائل */}
                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', padding: '0 8px 16px 8px' }}>
                  {getConversation(selectedContactId).map(msg => {
                    const isMine = msg.senderId === currentUserId;
                    return (
                      <div 
                        key={msg.id}
                        style={{ 
                          alignSelf: isMine ? 'flex-end' : 'flex-start',
                          background: isMine ? '#6C63FF' : '#fff',
                          color: isMine ? '#fff' : '#0f172a',
                          padding: '10px 16px',
                          borderRadius: isMine ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                          maxWidth: '70%',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                          border: isMine ? 'none' : '1px solid #e2e8f0'
                        }}
                      >
                        <div>{msg.content}</div>
                        <div style={{ fontSize: '10px', color: isMine ? '#c4b5fd' : '#94a3b8', marginTop: '4px', textAlign: 'right' }}>
                          {formatTime(msg.timestamp)}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* حقل إدخال الرسالة */}
                <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '12px', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                  <input 
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Écrivez votre message..."
                    style={{ 
                      flex: 1, 
                      padding: '12px 16px', 
                      borderRadius: '12px', 
                      border: '1px solid #e2e8f0', 
                      outline: 'none', 
                      fontSize: '14px'
                    }}
                  />
                  <button 
                    type="submit"
                    style={{ 
                      padding: '12px 24px', 
                      background: '#6C63FF', 
                      color: '#fff', 
                      border: 'none', 
                      borderRadius: '12px', 
                      fontWeight: '500', 
                      cursor: 'pointer'
                    }}
                  >
                    Envoyer
                  </button>
                </form>
              </>
            ) : (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>💬</div>
                  <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#0f172a' }}>Sélectionnez un contact</h3>
                  <p style={{ fontSize: '14px' }}>Choisissez un professeur ou un camarade pour commencer à discuter.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EtudiantMessages;