const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testContactForm() {
  console.log('🧪 Testing contact form API...');
  
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '123-456-7890',
    message: 'This is a test message from the contact form test script.'
  };
  
  try {
    console.log('📤 Sending test data to API endpoint...');
    console.log(testData);
    
    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });
    
    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Test successful! API response:');
      console.log(result);
    } else {
      console.log('❌ Test failed! API response:');
      console.log(result);
    }
  } catch (error) {
    console.error('❌ Error testing contact form API:', error.message);
  }
}

// Run test if this script is executed directly
if (require.main === module) {
  testContactForm();
}

module.exports = { testContactForm };