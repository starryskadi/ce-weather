import React, { useRef, useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import { InputBase, IconButton, Paper, Box, Grid } from "@material-ui/core"
import { Add as AddIcon } from "@material-ui/icons"
import './popup.css'
import WeatherCard from './WeatherCard'
import { setStoredCities, getStoredCities } from '../utils/storage'

const App: React.FC<{}> = () => {
  const  [cites, setCities] = useState<string[]>([])
  const cityInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    getStoredCities().then(cites => {
      setCities(cites)
    })
  }, [])

  const onCityButtonHandler = () => {
    if (!cityInputRef.current && !cityInputRef.current.value) {
      return
    }
    const updateCites = [...cites, cityInputRef.current.value];
    setCities(updateCites)
    setStoredCities(updateCites)

    cityInputRef.current.value = ""
  }

  const onCityDeleteHandler = (index: number) => {
    const updateCites = [...cites];
    updateCites.splice(index, 1)
    setCities(updateCites)
    setStoredCities(updateCites)
  }

  return (
    <div>
      <Paper>
        <Box px={2}>
          <Grid 
            container
            alignItems='center'
            justify='space-between'
            >
              <Grid item>
                <InputBase 
                  inputRef={cityInputRef}
                  placeholder='Add a city name'
                  onKeyDown={(ev) => {
                    if (ev.key === "Enter") {
                      onCityButtonHandler()
                    }
                  }}
                />
              </Grid>
              <Grid item>
                <IconButton onClick={onCityButtonHandler}>
                  <AddIcon></AddIcon>
                </IconButton>
              </Grid>
          </Grid>
       
        </Box>
      </Paper>
      {cites.map((city, index) => (
         <WeatherCard city={city} onDelete={() => { onCityDeleteHandler(index) }} />
      ))}
    </div>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
