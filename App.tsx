import React from 'react';
import {Linking, SafeAreaView, StatusBar} from 'react-native';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {View} from 'react-native';

import {} from 'react-native';

const App = () => {
  const targetUrl = 'https://itsector-tech-o-clock-web.vercel.app/';
  // const targetUrl = 'https://google.pt';

  const backgroundStyle = {
    flex: 1,
  };

  const webViewScript = `
    // set isMobileApp Here
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
        default:
          return;
      }
    }
  };

  console.log('App > Render >', {targetUrl, backgroundStyle, webViewScript});

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={'dark-content'} />
      <View style={backgroundStyle}>
        <WebView
          startInLoadingState={true}
          source={{
            uri: targetUrl,
          }}
          javaScriptEnabled={true}
          automaticallyAdjustContentInsets={false}
          injectedJavaScriptBeforeContentLoaded={webViewScript}
          onMessage={handleCommunicationBridgeEvents}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;
