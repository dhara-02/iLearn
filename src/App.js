/*global chrome*/

import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';

function App() {
  function getMetas() {
    // var message = document.querySelector('#metaTable');
    chrome.tabs.executeScript(null, {
      code: `var metas = window.getElementsByTagName('meta'); 
      var metaArr = [];
      for (var i=0; i<metas.length; i++) { 
        var name = metas[i].getAttribute("name");
        var property = metas[i].getAttribute("property");
        var httpequiv = metas[i].getAttribute("http-equiv");
        var content = metas[i].getAttribute("content");
        var charset = metas[i].getAttribute("charset");
        
        metaArr.push([name, property, httpequiv, content, charset]);
      } 
      
      chrome.runtime.sendMessage({
        method:"getMetas",
        metas:metaArr
      });`
    }, function() {
      // If you try it into an extensions page or the webstore/NTP you'll get an error
      if (chrome.runtime.lastError) {
        // message.innerText = 'There was an error : \n' + chrome.runtime.lastError.message;
      }
    });
  }

  function getTabChange() {
    chrome.runtime.sendMessage({
      method:"onTabChange",
    });  
  }
  function addListener() {
    chrome.tabs.onActivated.addListener(
      getMetas
    )
  }
  // window.onload = addListener;
  useEffect(() => {
    getTabChange()
    addListener()
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
