const axios = require("axios");
const { PROD_ACCESS_TOKEN } = process.env;
const { Notifications, Payment, User, Contract } = require("../db");

const URL = process.env.FRONT_URL || "http://localhost:3000";

var mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: PROD_ACCESS_TOKEN,
});

async function getAllPayments(req, res, next) {
  try {
    const allPayments = await Payment.findAll({
      include: [{ model: User }, { model: Contract }],
      order: [["date", "DESC"]],
    });
    return res.json(allPayments);
  } catch (err) {
    res.json(err);
  }
}

async function createPreference(req, res, next) {
  const { title, price, description, contractId } = req.body;

  try {
    let preference = {
      items: [
        {
          id: contractId,
          title: title,
          currency_id: "ARS",
          picture_url:
            "https://res.cloudinary.com/makelaar/image/upload/v1631883556/logo-color_bzxf50.png", //logo makelar
          description: description,
          category_id: "others",
          quantity: 1,
          unit_price: parseInt(price),

          back_urls: {
            success: URL,
            failure: URL,
            pending: URL,
          },
        },
      ],

      statement_descriptor: "MINEGOCIO",
      external_reference: "Reference_1234",
      concept_id: contractId,
    };
    const respuesta = await mercadopago.preferences.create(preference);

    return res.send(respuesta.response.init_point);
  } catch (err) {
    next(err);
  }
}

async function newNotification(req, res, next) {
  const { id } = req.query;
  const { topic, resource } = req.body;
  try {
    if (topic === "payment") {
      const notifications = await Notifications.create({
        idNot: id,
        topic: topic,
        resource: `https://api.mercadopago.com/v1/payments/${id}`,
      });

      let references = await axios.get(
        `https://api.mercadopago.com/v1/payments/${id}`,
        {
          headers: { Authorization: `Bearer ${PROD_ACCESS_TOKEN}` },
        }
      );

      references = references.data;

      try {
        let paymentUser = await User.findOne({
          where: {
            email: references.payer.email,
          },
        });

        let newPay = {
          idPay: references.order.id,
          status: references.status,
          userEmail: references.payer.email,
          amount: references.additional_info.items[0].unit_price,
          ContractId: parseInt(references.additional_info.items[0].id),
          date: new Date(),
        };

        await paymentUser.createPayment(newPay);
        return res.json(newPay);
      } catch (err) {
        res.json(err);
      }
    } else {
      return res.json({
        msg: "La informacion recibida no corresponde a un pago",
      });
    }
  } catch (err) {
    next(err);
  }
}

async function addAllPayments(req, res, next) {
  try {
    const { idPay, status, userEmail, amount, ContractId, date } = req.body;
    let paymentUser = await User.findOne({
      where: {
        email: userEmail,
      },
    });
    const newPayment = await paymentUser.createPayment({
      idPay,
      status,
      userEmail,
      amount,
      ContractId,
      date: new Date(date),
    });

    return res.json(newPayment);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createPreference,
  newNotification,
  getAllPayments,
  addAllPayments,
};
