document.addEventListener('DOMContentLoaded', () => {
    alert('hi');
    const query = { active: true, currentWindow: true };
  
    chrome.tabs.query(query, (tabs) => {
      console.log('tabs api response: ', tabs);
      const tabDetails = {
        id: tabs[0].id,
        title: tabs[0].title,
        favIconUrl: tabs[0].favIconUrl,
        url: tabs[0].url,
      }
      const domMetaDesc = document.querySelector('meta[name="description"]') ? document.querySelector('meta[name="description"]') : '';
      const domKeywords = document.querySelector('meta[name="keywords"]') ? document.querySelector('meta[name="keywords"]') : '';
//       <meta name="subject" content="your website"s subject">
// <meta name="topic" content="">
// <meta name="category" content="">

      tabDetails.metaDesc = domMetaDesc;
      tabDetails.metaKeywords = domKeywords;

      console.log('tabDetails testing: ', tabDetails);
      console.warn('tabDetails warn: ', JSON.stringify(tabDetails));
      console.warn('hiee warn: ', 'hiee');

    });
  });