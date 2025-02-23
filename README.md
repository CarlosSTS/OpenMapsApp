# Location Routing App

This project demonstrates how to use a @carlossts/rtn-utils library to open navigation apps like Uber, Waze, and Google Maps for route navigation.

## Installation

```bash
npm install @carlossts/rtn-utils
or
yarn add @carlossts/rtn-utils
```

## Configuration

To ensure the app can query installed navigation apps on Android, you need to add the following configuration to your `AndroidManifest.xml` file:

```xml
  <!-- Add this line -->
<uses-permission android:name="android.permission.QUERY_ALL_PACKAGES" />
  <!-- Or -->
<queries>
  <package android:name="com.ubercab" /> <!-- package id -->
  <package android:name="com.waze" /> <!-- package id -->
  <package android:name="com.google.android.apps.maps" /> <!-- package id -->
  <!-- ... -->
</queries>
```

### Why is this required?
Starting from Android 11 (API level 30), apps can no longer query all installed packages by default. Instead, they must explicitly declare the packages they need access to using the `<queries>` tag in the `AndroidManifest.xml`. This is necessary to check if a navigation app is installed before trying to open it.
> [For more information, refer to the official Android documentation on querying packages for Android 11 and above.](https://developer.android.com/reference/android/Manifest.permission#QUERY_ALL_PACKAGES)


## Screenshots

### getLocationApps method
<img src="https://firebasestorage.googleapis.com/v0/b/portfolio-web-7fbff.appspot.com/o/libs_npm%2Frtn-utils%2Fimage07.jpeg?alt=media&token=455c652f-a1d9-41c1-8e7c-8099b9c18c0f" width="200" />


### openAppWithLocation method
<img src="https://firebasestorage.googleapis.com/v0/b/portfolio-web-7fbff.appspot.com/o/libs_npm%2Frtn-utils%2Fimage08.jpeg?alt=media&token=7c016f39-b8b0-4d0a-91dc-c393f12277d6" width="200" />

## Library Reference
> [Library Reference](https://github.com/CarlosSTS/rtn-utils)


## License

MIT