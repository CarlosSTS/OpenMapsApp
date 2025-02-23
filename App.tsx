import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RTNUtils} from '@carlossts/rtn-utils';

interface MapApp {
  name: string;
  package: string;
  icon?: string;
}

type MapApps = MapApp[] | undefined;
const App: React.FC = () => {
  const [mapApps, setMapApps] = useState<MapApps>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const getLocationApps = useCallback(async () => {
    try {
      const apps = await RTNUtils?.getLocationApps({
        includesBase64: true,
      });
      setMapApps(apps);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';
      Alert.alert('openGlobalSettings Failed', errorMessage);
    }
  }, []);

  useEffect(() => {
    getLocationApps();
  }, [getLocationApps]);

  const onRequestModal = useCallback(() => {
    setModalVisible(state => !state);
  }, []);

  const handleAppOpen = useCallback(async (app: MapApp) => {
    let scheme = '';
    const lat = -4.128489;
    const lng = -38.2593854;
    const label = 'My Location Test';
    if (app.package === 'com.waze') {
      scheme = `waze://?ll=${lat},${lng}&navigate=yes`;
    } else {
       scheme = `geo:0,0?q=${lat},${lng}(${label})`;
    }

    try {
      await RTNUtils?.openAppWithLocation({
        packageName: app.package,
        url: scheme,
      });
    } catch (error) {
      Alert.alert(
        'openAppWithLocation Failed',
        error instanceof Error ? error.message : 'An unknown error occurred',
      );
    }
  }, []);

  const renderAppItem = useCallback(({item}: {item: MapApp}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.appItem}
        onPress={() => handleAppOpen(item)}>
        <Image source={{uri: item.icon}} style={styles.appIcon} />
        <Text style={styles.appName}>{item.name}</Text>
      </TouchableOpacity>
    );
  }, [handleAppOpen]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.openButton}
        onPress={onRequestModal}>
        <Text style={styles.openButtonText}>Open modal with apps</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onRequestModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Open with ({mapApps?.length})</Text>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={mapApps}
              renderItem={renderAppItem}
              keyExtractor={item => item.package}
              contentContainerStyle={styles.appList}
            />

            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.cancelButton}
              onPress={onRequestModal}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F9',
  },
  openButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
  },
  openButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#F5F5F9',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  appList: {
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  appItem: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  appIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  appName: {
    fontSize: 16,
    color: '#000',
  },
  cancelButton: {
    width: '100%',
    backgroundColor: '#666',
    padding: 15,
    borderRadius: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FAFAFA',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
