import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import './options.css'
import { Paper, InputBase, Box, Grid, IconButton, Typography, CircularProgress  } from "@material-ui/core"
import { ArrowRightAlt } from "@material-ui/icons"
import { getStoredOptions, LocalStorageOptions, setStoredOptions } from "../utils/storage";

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions>()
  const weatherApiKeyInput = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    getStoredOptions().then(options => {
      setOptions(options)
      weatherApiKeyInput.current.value = options.apiKey;
    })
  }, [])

  const onWeatherApiHandler = () => {
    setLoading(true)
    setStoredOptions({
      ...options,
      apiKey: weatherApiKeyInput.current.value
    }).then(() => {
        setLoading(false)
    })
  }

  return (
    <Box maxWidth={600} marginX="auto"  bgcolor="#fafafa">
      <Box bgcolor="white" px={2} py={4}>
      <Typography gutterBottom variant='h5'> Open Weather API Key </Typography>
      <Paper>
        <Box px={2} py={1}>
          <Grid container justify='space-between' alignItems='center'>
            <Grid item style={{ flex: 1}} >
              <InputBase
                disabled={loading}
                style={{ width: "100%" }}
                inputRef={weatherApiKeyInput}
                placeholder='Open Weather API Key'
                        />
            </Grid>
            <Grid item>
              <IconButton onClick={onWeatherApiHandler} disabled={loading}>
                  {loading ? <CircularProgress size={24} />: <ArrowRightAlt />}
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Typography variant='body2'> Generate your own open weather api key at <a href="https://openweathermap.org/api">https://openweathermap.org/api</a> </Typography>
      </Box>
    </Box>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
