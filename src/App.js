import './App.css';
import { useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

function App() {
  const [values, setValues] = useState({
    currentValue: {
      num1: 0,
      num2: 0,
      num3: 0,
      num4: 0,
      num5: 0
    },
    prevouisValue: {
      num1: 0,
      num2: 0,
      num3: 0,
      num4: 0,
      num5: 0
    },
    nextValue: {
      num1: 0,
      num2: 0,
      num3: 0,
      num4: 0,
      num5: 0
    }
  })
  const [range, setRange] = useState(36)
  const [start, SetStart] = useState(false)

  function generateUniqueNumbers(range, count) {
    let uniqueNumbers = new Set();

    while (uniqueNumbers.size < count) {
      uniqueNumbers.add(Math.floor(Math.random() * range));
    }

    let uniqueArray = [...uniqueNumbers];

    return {
      num1: uniqueArray[0] + 1,
      num2: uniqueArray[1] + 1,
      num3: uniqueArray[2] + 1,
      num4: uniqueArray[3] + 1,
      num5: uniqueArray[4] + 1,
    };
  }

  useEffect(() => {
    if (!start) {
      return;
    }

    const interval = setInterval(() => {
      let newValues = generateUniqueNumbers(range, 5);
      // SetStart(Math.floor(Math.random() * 100) != 99)
      setValues(prevValue => ({
        nextValue: newValues,
        currentValue: prevValue.nextValue,
        prevouisValue: prevValue.currentValue
      }));
    }, 200);

    return () => clearInterval(interval);

  }, [start]);

  return (
    <div className="App">
      <Button onClick={() => SetStart(!start)} sx={{ mt: 3, mr: 2 }}>{!start ? "Start":"End"}</Button>
      {/* <TextField label="Range" variant="outlined" sx={{ mb: 2, mt: 2 }} onChange={event => {
        setRange(event.target.value);
      }} /> */}
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        sx={{
          border: "1px solid #ccc",
          borderRadius: 2,
          ml: 5,
          mr: 5,
          backgroundColor: "#f0f0f0",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          width: "100%",
        }}
      >
        <Box display="flex" justifyContent="space-between" gap={4} width="100%" sx={{ position: "relative" }}>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap={2}
            sx={{
              flex: 1,
              backgroundColor: "#ffffff",
              padding: 2,
              borderRadius: 2,
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            {[...Array(5)].map((_, index) => (
              <TextField
                key={`next-${index}`}
                value={values.nextValue[`num${index + 1}`]}
                fullWidth
                variant="standard"
                InputProps={{ disableUnderline: true }}
                sx={{
                  backgroundColor: "transparent",
                  animation: start ? `slideDown 0.2s ease-in-out infinite` : "none", 
                }}
              />
            ))}
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" gap={4} width="100%" sx={{ position: "relative" }}>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap={2}
            sx={{
              flex: 1,
              backgroundColor: "#fffae6",
              padding: 4,
              borderRadius: 2,
              
          ml: 5,
          mr: 5,
              boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.2)",
              transform: "scale(1.06)",
            }}
          >
            {[...Array(5)].map((_, index) => (
              <TextField
                key={`current-${index}`}
                value={values.currentValue[`num${index + 1}`]}
                fullWidth
                variant="standard"
                InputProps={{ disableUnderline: true }}
                sx={{
                  backgroundColor: "transparent",
                  fontWeight: 'bold',
                  animation: start ? `slideDown 0.2s ease-in-out infinite` : "none",
                }}
              />
            ))}
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" gap={4} width="100%" sx={{ position: "relative" }}>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap={2}
            sx={{
              flex: 1,
              backgroundColor: "#ffffff",
              padding: 2,
              borderRadius: 2,
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            {[...Array(5)].map((_, index) => (
              <TextField
                key={`prev-${index}`}
                value={values.prevouisValue[`num${index + 1}`]}
                fullWidth
                variant="standard"
                InputProps={{ disableUnderline: true }}
                sx={{
                  backgroundColor: "transparent",
                  animation: start ? `slideDown 0.2s ease-in-out infinite` : "none",
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default App;
