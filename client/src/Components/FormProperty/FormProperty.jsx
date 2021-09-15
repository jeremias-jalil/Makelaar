import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import UploadImage from "../Upload/UploadImage";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import {
  Container,
  FormControlLabel,
  Checkbox,
  Grid,
  makeStyles,
  Paper,
  Button,
  FormGroup,
  Typography,
} from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

import FormControl from "@material-ui/core/FormControl";

import { Controls } from "./Controls";
import GoogleMap from "../GoogleMap/GoogleMap";

const transaction = ["Alquiler", "Venta", "Alquiler Temporario"];
const type = ["Casa", "Departamento", "Local", "Duplex", "Terreno"];
const condition = ["A estrenar", "1 a 5 años", "5 a 10 años", "Mas de 10 años"];

const useStyle = makeStyles((theme) => ({
  form: {
    "& .MuiFormControl-root": {
      width: "25ch",
      margin: theme.spacing(2),
    },
  },
  root: {
    width: "100%",
    // margin: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    allingItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "100%",
  },
  header: {
    fontSize: "25px",
  },
  check: {
    marginLeft: "2%",
    display: "flex",
  },
  checkBox: {
    flexDirection: "row",
  },
  input: {
    width: "25ch",
  },
  name: {
    width: "100%",
  },
  mapContainer: {
    objectFit: "cover",
    minWidth: "350px",
    maxWidth: "350px",
    maxHeight: "400px",
    height: "400px",

    marginBottom: "10%",
  },
  suggestionsContainer: {
    marginLeft: "3%",
    marginBottom: "3%",
  },
  grid: {
    display: "flex",
    flexDirection: "columns",
  },
}));

export default function FormProperty() {
  const classes = useStyle();
  const {
    handleChange,
    handleSubmit,
    handleCheck,
    formValid,
    errors,
    property,
    check,
    setImage,
    address,
    setAddress,
    handleSelect,
    img,
  } = Controls();

  return (
    <>
      <Paper className={classes.root}>
        <Container className={classes.header}>Registra tu Propiedad</Container>
        <form
          className={classes.form}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Grid container>
            <Grid item className={classes.grid}>
              <FormGroup>
                <TextField
                  className={classes.name}
                  // autoComplete='off'
                  // inputProps={{
                  //     autocomplete: 'off',
                  //     form: {
                  //       autocomplete: 'off',
                  //     },
                  //   }}
                  variant="outlined"
                  label="Nombre"
                  name="name"
                  onBlur={handleChange}
                  value={property.name}
                  onChange={handleChange}
                  {...(errors.name && {
                    error: true,
                    helperText: errors.name,
                  })}
                  required
                />

                <TextField
                  className={classes.input}
                  variant="outlined"
                  label="Precio"
                  name="price"
                  value={property.price}
                  onChange={handleChange}
                  {...(errors.price && {
                    error: true,
                    helperText: errors.price,
                  })}
                  required
                />

                <TextField
                  className={classes.input}
                  variant="outlined"
                  label="Area"
                  name="area"
                  value={property.area}
                  onChange={handleChange}
                  {...(errors.area && {
                    error: true,
                    helperText: errors.area,
                  })}
                  required
                />

                <TextField
                  variant="outlined"
                  label="Habitaciones"
                  name="rooms"
                  type="number"
                  value={property.rooms}
                  onChange={handleChange}
                  {...(errors.rooms && {
                    error: true,
                    helperText: errors.rooms,
                  })}
                  required
                />

                <TextField
                  variant="outlined"
                  label="Baños"
                  name="bathrooms"
                  type="number"
                  value={property.bathrooms}
                  onChange={handleChange}
                  required
                  {...(errors.bathrooms && {
                    error: true,
                    helperText: errors.bathrooms,
                  })}
                />

                <TextField
                  variant="outlined"
                  label="Descripcion del Inmueble"
                  name="description"
                  value={property.description}
                  multiline
                  minRows={8}
                  onChange={handleChange}
                  required
                  {...(errors.description && {
                    error: true,
                    helperText: errors.description,
                  })}
                />
              </FormGroup>
              <FormGroup>
                <FormControl component="fieldset">
                  <Typography>Tipo de Propiedad</Typography>
                  <RadioGroup aria-label="type" name="type" value={check.type}>
                    {type &&
                      type.map((t) => (
                        <FormControlLabel
                          value={t}
                          control={<Radio />}
                          onChange={handleCheck}
                          label={t}
                        />
                      ))}
                  </RadioGroup>
                </FormControl>

                <FormControl component="fieldset">
                  <Typography>Condicion de la Propiedad</Typography>
                  {/* <FormLabel component="legend">Condicion de la Propiedad</FormLabel> */}
                  <RadioGroup
                    aria-label="condition"
                    name="condition"
                    value={check.condition}
                  >
                    {condition &&
                      condition.map((t) => (
                        <FormControlLabel
                          value={t}
                          control={<Radio />}
                          onChange={handleCheck}
                          label={t}
                        />
                      ))}
                  </RadioGroup>
                </FormControl>
                <FormControl component="fieldset">
                  <Typography>Que tipo de actividad desea realizar?</Typography>
                  <RadioGroup
                    aria-label="transaction"
                    name="transaction"
                    value={check.transaction}
                  >
                    {transaction &&
                      transaction.map((t) => (
                        <FormControlLabel
                          value={t}
                          control={<Radio />}
                          onChange={handleCheck}
                          label={t}
                        />
                      ))}
                  </RadioGroup>
                  {/* {console.log("PROPIEDADCHECK", property)} */}
                </FormControl>
              </FormGroup>
              <FormGroup>
                <PlacesAutocomplete
                  value={address}
                  onChange={setAddress}
                  onSelect={handleSelect}
                >
                  {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading,
                  }) => (
                    <div>
                      <TextField
                        variant="outlined"
                        label="Dirección"
                        name="address"
                        multiline
                        minRows={4}
                        value={property.address}
                        required
                        {...getInputProps({
                          placeholder: "Busca una dirección ...",
                          className: "location-search-input",
                        })}
                      />

                      <div className={classes.suggestionsContainer}>
                        {loading && <div>Loading...</div>}
                        {suggestions.map((suggestion) => {
                          const className = suggestion.active
                            ? "suggestion-item--active"
                            : "suggestion-item";
                          // inline style for demonstration purpose
                          const style = suggestion.active
                            ? { backgroundColor: "#E1535E", cursor: "pointer" }
                            : { backgroundColor: "#ffffff", cursor: "pointer" };
                          return (
                            <>
                              <div
                                {...getSuggestionItemProps(suggestion, {
                                  className,
                                  style,
                                })}
                              >
                                <span>{suggestion.description}</span>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>
                <TextField
                  variant="outlined"
                  label="Ciudad"
                  name="city"
                  value={property.city}
                  onChange={handleChange}
                  required
                  {...(errors.city && {
                    error: true,
                    helperText: errors.city,
                  })}
                />

                <TextField
                  variant="outlined"
                  label="Barrio"
                  name="neighborhood"
                  value={property.neighborhood}
                  onChange={handleChange}
                  required
                  {...(errors.neighborhood && {
                    error: true,
                    helperText: errors.neighborhood,
                  })}
                />

                <TextField
                  variant="outlined"
                  label="Provincia"
                  name="province"
                  value={property.province}
                  onChange={handleChange}
                  required
                  {...(errors.province && {
                    error: true,
                    helperText: errors.province,
                  })}
                />
                <TextField
                  variant="outlined"
                  label="Codigo Postal"
                  name="cp"
                  type="number"
                  value={property.cp}
                  onChange={handleChange}
                  required
                  {...(errors.cp && {
                    error: true,
                    helperText: errors.cp,
                  })}
                />
              </FormGroup>
              <FormGroup>
                <div className={classes.mapContainer}>
                  <h5>Seleccioná la ubicacion exacta:</h5>
                  <GoogleMap lat={property.lat} lng={property.lng} />
                </div>

                {/* CARGAR IMG PPAL */}

                {/* CARGAR FOTOS */}

                <UploadImage images={img} setImages={setImage} />
              </FormGroup>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.button}
            disabled={!formValid()}
          >
            Enviar
          </Button>
        </form>
      </Paper>
    </>
  );
}
