import { useState } from "react";
import { addNewProperty } from "../../Functions/api/property";
import Swal from "sweetalert2";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

const resetValues = {
  price: "",
  name: "",
  available: true,
  area: "",
  rooms: "",
  bathrooms: "",
  type: "",
  city: "",
  neighborhood: "",
  province: "",
  address: "",
  cp: "",
  description: "",
  photos: [],
  status: "activo",
  transaction: "",
  premium: false,
  condition: "",
  lat: -31.4173,
  lng: -64.183037,
};

export function Controls(update) {
  const [property, setProperty] = useState(resetValues);

  const [img, setImg] = useState([]);

  const [errors, setErrors] = useState({});

  const [check, setCheck] = useState({});

  const [address, setAddress] = useState("");
  // eslint-disable-next-line
  const [latLng, setLatLng] = useState({});

  function validate(values = property) {
    let error = { ...errors };

    if ("name" in values)
      error.name = values.name ? "" : "Este campo es requerido";
    if (values.name) {
      error.name =
        /^[a-zA-Zñáéíóú]+(([',. -][a-zA-Zñáéíóú ])?[a-zA-Zñáéíóú]*)*$/.test(
          values.name
        )
          ? ""
          : "El nombre no es valido";
    }

    if ("area" in values)
      error.available = values.area ? "" : "Este campo es requerido";
    if (values.area) {
      error.area = /^[+-]?\d+([,.]\d+)?$/.test(values.area)
        ? ""
        : "El numero de area no es valido";
    }

    if ("price" in values)
      error.available = values.price ? "" : "Este campo es requerido";
    if (values.price) {
      error.price = /^[+-]?\d+([,.]\d+)?$/.test(values.price)
        ? ""
        : "El numero de area no es valido";
    }

    if ("rooms" in values)
      error.values = values.rooms ? "" : "Este campo es requerido";
    if (values.rooms) {
      error.rooms = /^[+-]?[0-9]+$/.test(values.rooms)
        ? ""
        : "El numero de habitaciones debe ser un numero entero";
    }

    if ("bathrooms" in values)
      error.values = values.bathrooms ? "" : "Este campo es requerido";
    if (values.bathrooms) {
      error.bathrooms = /^[+-]?[0-9]+$/.test(values.bathrooms)
        ? ""
        : "El numero de baños debe ser un numero entero";
    }

    if ("type" in values)
      error.values = values.type ? "" : "Este campo es requerido";

    if ("city" in values)
      error.values = values.city ? "" : "Este campo es requerido";
    if (values.city) {
      error.city = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(
        values.city
      )
        ? ""
        : "El nombre de ciudad no es valido";
    }

    if ("neighborhood" in values)
      error.values = values.neighborhood ? "" : "Este campo es requerido";
    if (values.neighborhood) {
      error.neighborhood = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(
        values.neighborhood
      )
        ? ""
        : "El nombre del barrio no es valido";
    }

    if ("province" in values)
      error.values = values.province ? "" : "Este campo es requerido";
    if (values.province) {
      error.province = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(
        values.province
      )
        ? ""
        : "El nombre de la provincia no es valido";
    }

    if ("cp" in values)
      error.values = values.cp ? "" : "Este campo es requerido";
    if (values.cp) {
      error.cp = /^[+-]?[0-9]+$/.test(values.cp)
        ? ""
        : "El codigo postal debe ser un numero entero";
    }

    if ("status" in values)
      error.values = values.status ? "" : "Este campo es requerido";

    if ("transaction" in values)
      error.values = values.transaction ? "" : "Este campo es requerido";

    if ("condition" in values)
      error.values = values.condition ? "" : "Este campo es requerido";

    setErrors({ ...error });
  }

  function handleChange(e) {
    setProperty({
      ...property,
      [e.target.name]: e.target.value,
    });
    validate({ [e.target.name]: e.target.value });
  }

  function handleCheck(e) {
    setProperty({
      ...property,
      [e.target.name]: e.target.value,
    });
    setCheck({ ...check, [e.target.name]: e.target.value });
  }
  function formValid(values = property) {
    const isValid =
      values.name &&
      values.area &&
      values.rooms &&
      values.bathrooms &&
      values.type &&
      values.city &&
      values.neighborhood &&
      values.province &&
      values.cp &&
      values.transaction &&
      values.available &&
      values.status &&
      values.condition &&
      Object.values(errors).every((e) => e === "");

    return isValid;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const isValid = Object.values(errors).every((e) => e === "") && formValid();

    if (isValid) {
      try {
        const propertySubmit = { ...property, photos: img };

        const registeredProperty = await addNewProperty(propertySubmit);
        if (registeredProperty) {
          Swal.fire("Listo!", "Se agrego una propiedad con exito!", "success");
        }
      } catch (err) {
        return err;
      }
    }
    setProperty(resetValues);
    setImage([]);
    update();
    setCheck({});
  }

  function setImage(images) {
    setImg([...images]);
  }

  function deleteImg(pos) {
    let deleteImg = [...img];
    deleteImg.splice(pos, 1);
    setImg([...deleteImg]);
  }

  async function handleSelect(value) {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);

    setAddress(value);
    setLatLng(latLng);

    setProperty({
      ...property,
      address: value,
      lat: latLng.lat,
      lng: latLng.lng,
    });
  }

  return {
    property,
    check,
    errors,
    handleChange,
    handleCheck,
    handleSubmit,
    formValid,
    setImage,
    address,
    setAddress,
    handleSelect,
    img,
    deleteImg,
  };
}
