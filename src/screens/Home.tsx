import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamsList } from '../types/navigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Delete } from 'lucide-react-native';
import Share from 'react-native-share';
type Props = NativeStackScreenProps<RootStackParamsList, 'home'>;
type Data = {
  value: string | number;
  type: string;
  optName: string;
};
const Home: React.FC<Props> = props => {
  const insets = useSafeAreaInsets();
  const [data, setData] = useState<Data[]>([
    {
      value: 'C',
      type: 'OPT',
      optName: 'CLEAR',
    },
    {
      value: '%',
      type: 'OPT',
      optName: 'PERCENT',
    },
    {
      value: 'BACK',
      type: 'DELETE',
      optName: 'DELETE',
    },
    {
      value: '/',
      type: 'OPT',
      optName: 'DIVIDE',
    },
    {
      value: 7,
      type: 'NUM',
      optName: 'NUMBER',
    },
    {
      value: 8,
      type: 'NUM',
      optName: 'NUMBER',
    },
    {
      value: 9,
      type: 'NUM',
      optName: 'NUMBER',
    },
    {
      value: 'X',
      type: 'OPT',
      optName: 'MULTIPLY',
    },
    {
      value: 4,
      type: 'NUM',
      optName: 'NUMBER',
    },
    {
      value: 5,
      type: 'NUM',
      optName: 'NUMBER',
    },
    {
      value: 6,
      type: 'NUM',
      optName: 'NUMBER',
    },
    {
      value: '-',
      type: 'OPT',
      optName: 'MINUS',
    },
    {
      value: 1,
      type: 'NUM',
      optName: 'NUMBER',
    },
    {
      value: 2,
      type: 'NUM',
      optName: 'NUMBER',
    },
    {
      value: 3,
      type: 'NUM',
      optName: 'NUMBER',
    },
    {
      value: '+',
      type: 'OPT',
      optName: 'PLUS',
    },
    {
      value: '00',
      type: 'NUM',
      optName: 'NUMBER',
    },
    {
      value: 0,
      type: 'NUM',
      optName: 'NUMBER',
    },
    {
      value: '.',
      type: 'NUM',
      optName: 'DECIMAL',
    },
    {
      value: '=',
      type: 'EQUAL',
      optName: 'CALCULATE',
    },
  ]);
  const [value1, setValue1] = useState('0');
  const [value2, setValue2] = useState('');
  const [operator, setOperator] = useState('');
  const [history, setHistory] = useState('');

  const calculateAndShow = (item: Data) => {
    if (item.optName === 'CLEAR') {
      setValue1('0');
      setOperator('');
      setValue2('');
      setHistory('');
      return;
    }
    if (item.optName === 'DECIMAL') {
      if (value1 === '0') {
        setValue1('0.');
        return;
      }
      if (operator !== '' && value2 === '') {
        setValue2('0.');
        return;
      }
      if (
        operator === '' &&
        value1 !== '0' &&
        value1 !== '0.' &&
        !value1.includes('.')
      ) {
        setValue1(`${value1}.`);
        return;
      }
      if (operator !== '' && value2 !== '0.' && !value2.includes('.')) {
        setValue2(`${value2}.`);
      }

      return;
    }
    if (item.type === 'DELETE') {
      if (value2 !== '') {
        const newData = value2.slice(0, value2.length - 1);
        setValue2(newData === '' ? '' : newData);
        return;
      }
      if (operator !== '') {
        setOperator('');
        return;
      }

      if (value1 !== '') {
        const newData = value1.slice(0, value1.length - 1);
        console.log(newData);

        setValue1(newData === '' ? '0' : newData);
        return;
      }
      return;
    }

    if (item.type === 'NUM' && operator === '') {
      if (item.value === '00' && value1 === '0') {
        return;
      }
      const newData =
        value1 === '0' ? `${item.value}` : `${value1}${item.value}`;
      console.log(newData);

      if (newData.length < 14) {
        setValue1(newData);
      }
    }

    if (item.type === 'NUM' && operator !== '') {
      const newData = `${value2}${item.value}`;
      if (newData.length < 14) {
        setValue2(newData);
      }
    }

    if (item.type === 'OPT' && value1 !== '0') {
      if (value1.charAt(value1.length - 1) === '.') {
        setValue1(`${value1.slice(0, value1.length - 1)}`);
        return;
      }
      setOperator(`${item.value}`);
    }
  };

  const findAns = () => {
    if (value2.charAt(value2.length - 1) === '.') {
      setValue2(value2.slice(0, value2.length - 1));
    }
    const num1 = Number(value1);
    const num2 = Number(value2);
    console.log(num1, num2);
    if (isNaN(num1) || isNaN(num2)) {
      return 0;
    }
    if (num1 === 0 || num2 === 0) {
      return 0;
    }
    switch (operator) {
      case '+':
        return num1 + num2;
      case '-':
        return num1 - num2;
      case 'X':
        return num1 * num2;
      case '%':
        return (num1 * num2) / 100;
      case '/':
        return num2 !== 0 ? num1 / num2 : 0;
      default:
        return 0;
    }
  };

  return (
    <View
      style={[
        styles.main,
        { paddingBottom: insets.bottom, paddingTop: insets.top },
      ]}
    >
      <View style={styles.bottom}>
        <FlatList
          data={data}
          keyExtractor={(item, id) => id.toString()}
          columnWrapperStyle={{ gap: '5%' }}
          numColumns={4}
          contentContainerStyle={{
            rowGap: 12,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          renderItem={({ item }) => (
            <Pressable
              style={[
                styles.circle,
                item.type === 'EQUAL'
                  ? { backgroundColor: 'red' }
                  : item.type === 'NUM'
                  ? { backgroundColor: '#181818' }
                  : { backgroundColor: '#323232' },
              ]}
              onPress={() => {
                if (item.type === 'EQUAL') {
                  if (value1 == '0' && value2 == '' && operator == '') {
                    return;
                  }
                  if (value1 !== '0' && operator == '') {
                    return;
                  }
                  if (value1 !== '0' && operator !== '' && value2 == '') {
                    return;
                  }
                  const data = findAns();
                  setHistory(`${value1}${operator}${value2}`);
                  setValue1(data.toFixed(3).replace(/\.?0+$/, ''));
                  setOperator('');
                  setValue2('');
                } else {
                  calculateAndShow(item);
                }
              }}
            >
              {item.type === 'DELETE' ? (
                <Delete color={'#fff'} />
              ) : (
                <Text style={{ fontSize: 23, color: '#fff' }}>
                  {item.value}
                </Text>
              )}
            </Pressable>
          )}
        />
      </View>
      <View>
        <View style={{ padding: 10, paddingHorizontal: 30 }}>
          <Text style={{ textAlign: 'right', fontSize: 20, color: '#fff' }}>
            {history}
          </Text>
          <Text style={{ textAlign: 'right', fontSize: 40, color: '#fff' }}>
            {`${value1}${operator}${value2}`}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#000',
    flexDirection: 'column-reverse',
    flex: 1,
  },
  bottom: {
    minWidth: '50%',
    padding: 10,
    minHeight: '50%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 15,
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Home;
