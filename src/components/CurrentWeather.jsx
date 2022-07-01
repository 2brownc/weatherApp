import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { TableContainer } from '@mui/material';
import symbol from '../lib/getUnits';
import WeatherSymbol from './WeatherSymbol';

function RainInfo({ current }) {
  if ({}.propertyIsEnumerable.call(current, 'rain')) {
    return (
      <TableRow>
        <TableCell align="right">
          <span>Rain Volume (~ 1hr)</span>
        </TableCell>
        <TableCell align="left">
          <span>
            <span>{current.rain['1h']}</span>
            <span>mm</span>
          </span>
        </TableCell>
      </TableRow>
    );
  }
}

function SnowInfo({ current }) {
  if ({}.propertyIsEnumerable.call(current, 'snow')) {
    return (
      <TableRow>
        <TableCell align="right">
          <span>Snow Volume (~ 1hr)</span>
        </TableCell>
        <TableCell align="left">
          <span>
            <span>{current.snow['1h']}</span>
            <span>mm</span>
          </span>
        </TableCell>
      </TableRow>
    );
  }
}

function CurrentWeatherCard({ current, units, geoLoc }) {
  if (current === null || current === undefined || geoLoc === undefined || geoLoc === null) {
    return undefined;
  }

  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Current Weather
        </Typography>
        <Grid
          container
          spacing={0}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} md={3}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <div style={{ fontSize: 'larger' }}>{geoLoc[0].name}</div>
                <div>{`${geoLoc[0].state}, ${geoLoc[0].country}`}</div>
              </Grid>
            </Grid>
            <WeatherSymbol
              weatherIconCode={current.weather[0].icon}
              description={current.weather[0].description}
            />
            <span style={{ fontSize: 'xx-large' }}>
              {current.temp}
              {symbol('temperature', units)}
              {' '}
            </span>
          </Grid>

          <Grid container item xs={12} md={8}>
            <TableContainer>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell align="right">
                      Humidity
                    </TableCell>
                    <TableCell>
                      <span>{current.humidity}</span>
                      <span>%</span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">
                      UV Index
                    </TableCell>
                    <TableCell>
                      {Math.round(current.uvi)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">
                      Pressure
                    </TableCell>
                    <TableCell>
                      <span>{current.pressure}</span>
                      <span> hPa</span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">
                      Visibility
                    </TableCell>
                    <TableCell>
                      <span>{((current.visibility / 1000) * (units === 'metric' ? 1 : 0.6213712)).toFixed(1)}</span>
                      <span>
                        {' '}
                        {symbol('visibility', units)}
                      </span>
                    </TableCell>
                  </TableRow>
                  <RainInfo current={current} />
                  <SnowInfo current={current} />
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default CurrentWeatherCard;
