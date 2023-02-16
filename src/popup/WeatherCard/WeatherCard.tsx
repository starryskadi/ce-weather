import React, { useEffect, useState } from 'react'
import { fetchOpenWeatherData, OpenWeatherData, OpenWeatherTempScale } from '../../utils/api';
import { Card, CardContent, CardActions, Typography, Box, Button, Grid } from "@material-ui/core"

const WeatherCardContainer: React.FC<{ children: React.ReactNode, onDelete?: () => void}> = ({ children, onDelete}) => {
    return (
    <Box my={2}>
        <Card>
            <CardContent>
                {children}
            </CardContent>
            <CardActions>
                {onDelete && 
                    <Box width="100%" display="flex" justifyContent="center">
                        <Button variant='contained' color="secondary" onClick={onDelete}>
                            Delete 
                        </Button>
                </Box>
                }
            </CardActions>
        </Card>
    </Box>
    )
}

type WeatherCardState = "loading" | "error" | "ready"

const WeatherCard:React.FC<
    {
        city: string,
        tempScale: OpenWeatherTempScale,
        apiKey: string,
        onDelete?: () => void
    }
> = ({ city, tempScale, apiKey, onDelete }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>()
  const [cardState, setCardState] = useState<WeatherCardState>("loading")

  useEffect(() => {
    fetchOpenWeatherData(city, tempScale, apiKey)
    .then((data) => { 
        setWeatherData(data);
        setCardState("ready")
    })
    .catch((err) => {
        setCardState("error")
    })
  }, [city, tempScale, apiKey]);

  if (cardState === "loading" || cardState === "error") {
    return <WeatherCardContainer >
        <Typography variant="body1">
            {cardState === "loading" ? "Loading" : "Error: could not retrive weather data (Hint: Wrong API Key or Wrong City Name) "}
        </Typography>
    </WeatherCardContainer>
  }

  return (
        <WeatherCardContainer onDelete={onDelete}>
            <Grid container justify='space-between' alignItems='center'>
                <Grid item>
                    <Box textAlign="center">
                        <Typography variant='body1'>{city}</Typography>
                        <Typography variant="h3" style={{ fontWeight: "bold" }} >{Math.round(weatherData.main.temp)}{tempScale === "imperial" ? "℉": "℃"}</Typography>
                        <Typography variant="body1">Feels Like: {Math.round(weatherData.main.feels_like)}{tempScale === "imperial" ? "℉": "℃"}</Typography>
                    </Box>
                </Grid>
                <Grid item>
                    <Box textAlign="center">
                        <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description} />
                        <Typography variant="body1">{weatherData.weather[0].description}</Typography>
                    </Box>
                </Grid>
            </Grid>
        </WeatherCardContainer>
  )
}

export default WeatherCard