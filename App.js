import { useEffect, useState } from 'react';
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { addDoc, collection, deleteField, firestore, onSnapshot, query, SHOPPINGLIST, updateDoc, doc } from './firebase/Config';
import { Ionicons } from '@expo/vector-icons';

export default function App() {

  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState('')


  useEffect(() => {
    const q = query(collection(firestore, SHOPPINGLIST))
    const unsubcribe = onSnapshot(q,(querySnapShot) => {
      const tempItems = []
      querySnapShot.forEach((doc) => {
        console.log(doc.id)
        tempItems.push({...doc.data(), id: doc.id})
      })
      setItems(tempItems)
    })
    return () => {
      unsubcribe()
    }
  }, [])


  const save = async() => {
    console.log('Saving...')
    try{
      const docRef = await addDoc(collection(firestore, SHOPPINGLIST), {
        text: newItem,
      })
      console.log('..Added new Item..' + docRef)
      setNewItem('')
    } catch(error) {
      console.log('Error ' + error)
    }
  }

  const del = async(id) => {
    try{
      const delRef = doc(firestore, SHOPPINGLIST, id)
      await updateDoc(delRef, {
        text: deleteField()
      })
      console.log('..deleting..')
    } catch (error) {
      console.log('Error ' + error)
    }

  }


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Shopping List</Text>
      <View style={styles.inputContainer}>

        <TextInput 
        placeholder='Add New Item...' 
        value={newItem}
        onChangeText={text => setNewItem(text)}
        />
        <Button title='Save' onPress={save}/>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {
          items.map((item) => {
            if (!item.text) {
              return null
            }
            return (
            <View key={item.id} style={styles.item}>
              <Text style={styles.text}>{item.text}</Text>
              <Ionicons name='trash-bin-outline' size={16} color='black' onPress={() => del(item.id)}/>
            </View>
          )
        })

        }
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

    justifyContent: 'center',
    padding: 36,
  },
  inputContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
  },

  item: {
    margin: 10,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scrollViewContent: {
    paddingTop: 30,
    paddingBottom: 10,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  text: {
    fontStyle: 'italic',
    fontSize: 16,

  }

});
