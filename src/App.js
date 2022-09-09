import React, {useState} from 'react'
import './App.css'

const App = () => {
  const [curCalc, setCurCalc] = useState('0')
  const [prevCalc, setPrevCalc] = useState('')
  const [operator, setOperator] = useState('')

  const handleNumber = (num) => {
    setCurCalc(prev => {
      let stringNum = String(prev)
      if(num === '.' && stringNum.length === 0) {
        return stringNum
      }else if(stringNum === '' && operator === '' && prevCalc !== '') {
        stringNum = `${prevCalc}${num}`
        setPrevCalc('')
        return stringNum
      }else if(prevCalc !== '' && operator === '') {
        return stringNum
      }else if(stringNum.includes('.') && num === '.') {
        return stringNum
      }else if(stringNum.split('')[0] === '0' && num !== '.' && prevCalc === null) {
        return stringNum
      }else if(stringNum.includes('.') && num === 0) {
        stringNum += num
        return stringNum
      }else if(stringNum.split('')[0] === '0' && !stringNum.includes('.') && num !== '.') {
        stringNum = ''
        stringNum = num
        return stringNum
      }else if(num === 0 && stringNum.split('')[0] === '0') {
        return stringNum
      }else {
        stringNum += num
        return stringNum
      }
    })
  }

  const handleOperator = (op) => {
    if(curCalc !== '') {
      setPrevCalc(prev => {
        setCurCalc('')
        prev = curCalc
        return prev
      })
      setOperator(prev => {
        if(curCalc === '') {
          return prev
        }else if(operator === '') {
          prev = op
          return prev
        }
      })
    }else {
      setPrevCalc(prev => {
        return prev
      })
      setOperator(prev => {
        if(operator === '') {
          prev = op
          return prev
        }
      })
    }
  }

  // console.log('cur', curCalc);
  // console.log('prev', prevCalc);

  const handleDel = () => {
    if(curCalc === '') {
      setOperator(prev => {
        let backspace = prev.slice(0, -1)
        return backspace
      })
    }
    if(operator === '') {
      setPrevCalc(prev => {
        let backspace = prev.slice(0, -1)
        return backspace
      })
    }
    if(curCalc !== '') {
      setCurCalc(prev => {
        let backspace = prev.slice(0, -1)
        return backspace
      })
    }
  }

  const handleAc = () => {
    setCurCalc('')
    setOperator('')
    setPrevCalc('')
  }

  const handleEqual = () => {
    setCurCalc('')
    setPrevCalc('')
    switch(operator) {
      case '+':
        setCurCalc(prev => {
          return prev = String(parseFloat(prevCalc) + parseFloat(curCalc))
        })
        setOperator('')
        return parseFloat(prevCalc) + parseFloat(curCalc)
      case '-':
        setCurCalc(prev => {
          return prev = String(parseFloat(prevCalc) - parseFloat(curCalc))
        })
        setOperator('')
        return parseFloat(prevCalc) - parseFloat(curCalc)
      case 'x':
        setCurCalc(prev => {
          return prev = String(parseFloat(prevCalc) * parseFloat(curCalc))
        })
        setOperator('')
        return parseFloat(prevCalc) * parseFloat(curCalc)
      case '/':
        setCurCalc(prev => {
          return prev = String(parseFloat(prevCalc) / parseFloat(curCalc))
        })
        setOperator('')
        return parseFloat(prevCalc) / parseFloat(curCalc)
      default:
        return;
    }
  }

  return (
    <div className='wrapper'>
      <div className='calculator'>
        <div>
          <div>{prevCalc} {operator} {curCalc}</div>
        </div>
      </div>
      <div className='grid'>
        <button onClick={handleAc} className='ac'>AC</button>
        <button onClick={handleDel}>DEL</button>
        <button onClick={operator === '' ? () => handleOperator('+') : undefined} className='operators'>+</button>
        <button onClick={() => handleNumber(1)}>1</button>
        <button onClick={() => handleNumber(2)}>2</button>
        <button onClick={() => handleNumber(3)}>3</button>
        <button onClick={operator === '' ? () => handleOperator('-') : undefined} className='operators'>-</button>
        <button onClick={() => handleNumber(4)}>4</button>
        <button onClick={() => handleNumber(5)}>5</button>
        <button onClick={() => handleNumber(6)}>6</button>
        <button onClick={operator === '' ? () => handleOperator('x') : undefined} className='operators'>x</button>
        <button onClick={() => handleNumber(7)}>7</button>
        <button onClick={() => handleNumber(8)}>8</button>
        <button onClick={() => handleNumber(9)}>9</button>
        <button onClick={operator === '' ? () => handleOperator('/') : undefined} className='operators'>/</button>
        <button onClick={() => handleNumber(0)} className='null'>0</button>
        <button onClick={() => handleNumber('.')}>.</button>
        <button onClick={((curCalc === '') || (prevCalc === '')) ? undefined : handleEqual} className='operators'>=</button>
      </div>
    </div>
  )
}

export default App