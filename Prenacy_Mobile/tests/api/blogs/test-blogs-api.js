const fetch = require('node-fetch');
const { API_CONFIG } = require('../../../src/config/api');

const testBlogsApi = async () => {
  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.BLOGS.POSTS}`;
  console.log('🔍 Testing Blog Posts API...');
  console.log('📡 URL:', url);
  
  try {
    const response = await fetch(url);
    console.log('📡 Response Status:', response.status);
    console.log('📡 Response Headers:', JSON.stringify(response.headers.raw(), null, 2));
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}\n` +
        `URL: ${url}\n` +
        `Response: ${errorText}`
      );
    }
    
    const data = await response.json();
    console.log('✅ Success! Found', data.length, 'posts');
    
    if (data.length > 0) {
      console.log('📝 Sample post:', JSON.stringify(data[0], null, 2));
    }

    // Validate data structure
    const samplePost = data[0];
    const requiredFields = ['id', 'title', 'content', 'author', 'thumbnail'];
    const missingFields = requiredFields.filter(field => !samplePost[field]);
    
    if (missingFields.length > 0) {
      console.warn('⚠️ Missing fields:', missingFields.join(', '));
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

testBlogsApi();