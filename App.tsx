import React from 'react';
import {Linking, Platform} from 'react-native';
import WebView, {WebViewMessageEvent} from 'react-native-webview';

import {} from 'react-native';

const App = () => {
  const targetUrl = 'http://itsector-tech-o-clock-web.vercel.app/';

  const webViewScript = `
    window.isNativeApp = true;
    true; 
  `;

  const handleCommunicationBridgeEvents = (
    event: WebViewMessageEvent,
  ): void => {
    console.log('Web View > Communication Bridge > event >', event);

    const {type} = JSON.parse(event.nativeEvent.data);
    if (type) {
      switch (type) {
        case 'OPEN_CONTACTS':
          console.log('Web View > Communication Bridge > Open Contacts');
          Linking.openURL('content://com.android.contacts/contacts');
          break;
        case 'OPEN_LOCATION':
          console.log('Web View > Communication Bridge > Open Location');
          const scheme = Platform.select({
            ios: 'maps:0,0?q=',
            android: 'geo:0,0?q=',
          });
          const latLng = `${41.1637855},${-8.6356358}`;
          const label = 'Custom Label';
          const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`,
          });

          url && Linking.openURL(url);
          break;
        default:
          return;
      }
    }
  };

  console.log('App > Render >', {targetUrl});

  return (
    <WebView
      scalesPageToFit={true}
      startInLoadingState={true}
      source={{
        uri: targetUrl,
      }}
      javaScriptEnabled={true}
      automaticallyAdjustContentInsets={false}
      injectedJavaScriptBeforeContentLoaded={webViewScript}
      onMessage={handleCommunicationBridgeEvents}
    />
  );
};

export default App;
