import React from 'react';
import {Linking, SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {View} from 'react-native';

import {} from 'react-native';

const App = () => {
  const backgroundStyle = {
    flex: 1,
  };

  // const webViewScript = `window = { ...window, techOClock: { isMobileApp: true}`;

  const webViewScript = `
    // set isMobileApp Here
    window.isNativeApp = true;
    true; 
  `;

  const handleCommunicationBridgeEvents = (
    event: WebViewMessageEvent,
  ): void => {
    console.log('Web View > handleCommunicationBridgeEvents > event >', event);

    const {type} = JSON.parse(event.nativeEvent.data);
    if (type) {
      switch (type) {
        case 'OPEN_CONTACTS':
          console.log(
            'Web View > handleCommunicationBridgeEvents > Open Contacts',
          );
          Linking.openURL('content://com.android.contacts/contacts');
          break;
        default:
          return;
      }
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={'dark-content'} />
      <View style={backgroundStyle}>
        <WebView
          source={{
            uri: 'https://google.pt',
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
