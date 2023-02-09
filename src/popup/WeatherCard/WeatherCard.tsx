import React, { useEffect, useState } from 'react'
import { fetchOpenWeatherData, OpenWeatherData } from '../../utils/api';
import { Card, CardContent, CardActions, Typography, Box, Button } from "@material-ui/core"

const WeatherCardContainer: React.FC<{ children: React.ReactNode, onDelete?: () => void}> = ({ children, onDelete}) => {
    return (
    <Box my={2}>
        <Card>
            <CardContent>
                {children}
            </CardContent>
            <CardActions>
                {onDelete && <Button variant='contained' color="secondary">Delete</Button>}
            </CardActions>
        </Card>
    </Box>
    )
}

type WeatherCardState = "loading" | "error" | "ready"

const WeatherCard:React.FC<
    {
        city: string,
        onDelete?: () => void
    }
> = ({ city, onDelete }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>()
  const [cardState, setCardState] = useState<WeatherCardState>("loading")

  useEffect(() => {
    fetchOpenWeatherData(city)
    .then((data) => { 
        setWeatherData(data);
        setCardState("ready")
    })
    .catch((err) => {
        setCardState("error")
    })
  }, [city]);

  if (cardState === "loading" || cardState === "error") {
    return <WeatherCardContainer >
        <Typography variant="body1">
            {cardState === "loading" ? "Loading" : "Error: could not retrive weather data for this city"}
        </Typography>
    </WeatherCardContainer>
  }

  return (
        <WeatherCardContainer onDelete={onDelete}>
            <Typography variant="h5">{city}</Typography>
            <Typography variant="body1">{Math.round(weatherData.main.temp)}</Typography>
            <Typography variant="body1">Feels Like: {Math.round(weatherData.main.feels_like)}</Typography>
        </WeatherCardContainer>
  )
}

export default WeatherCard