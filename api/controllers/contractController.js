const { Contract, User, Property, File, Payment } = require("../db");
const { sendUserEmail } = require("../email/userEmail");
const { confirmContract } = require("../email/emailModels/confirmContract");
const { newContractEmail } = require("../email/emailModels/newContract");

async function newContract(req, res, next) {
  try {
    const {
      name,
      startDate,
      endDate,
      amount,
      paymentDate,
      file,
      comments,
      UserId,
      PropertyId,
      email,
      status,
    } = req.body;

    let contract = await Contract.create({
      name: name,
      startDate: startDate,
      endDate: endDate,
      amount: amount,
      paymentDate: paymentDate,
      comments: comments,
      PropertyId: PropertyId,
      UserId: UserId,
      status: status,
    });

    if (file) {
      const files = file?.map(
        async (f) => await contract.createFile({ url: f.url })
      );

      await Promise.all(files);
    }

    sendUserEmail(newContractEmail(name, UserId, contract.id), email);

    res.json(contract);
  } catch (err) {
    next(err);
    return res.status(500).json(err);
  }
}

async function getContracts(req, res, next) {
  try {
    const contracts = await Contract.findAll({
      include: [{ model: User }, { model: Property }, { model: Payment }],
      order: [["endDate", "DESC"]],
    });
    if (!contracts.length) {
      return res.json({ msg: "No hay contratos registrados por el momento" });
    } else {
      return res.json(contracts);
    }
  } catch (err) {
    return next(err);
  }
}
async function getContractsById(req, res, next) {
  const contractId = req.params.id;
  try {
    const contract = await Contract.findByPk(contractId, {
      include: [
        {
          model: Payment,
          separate: true,
          order: [["date", "DESC"]],
          include: User,
        },
        { model: File },
        { model: Property },
      ],
    });
    if (contract) {
      res.json(contract);
    } else {
      res.status(204).json({ msg: "Id de contrato inexistente" });
    }
  } catch (err) {
    return next(err);
  }
}

async function editContract(req, res, next) {
  const {
    name,
    startDate,
    endDate,
    amount,
    paymentDate,
    comments,
    status,
    email,
  } = req.body;
  const id = Number(req.params.id);
  try {
    let foundContract = await Contract.findOne({ where: { id } });
    if (foundContract) {
      foundContract.name = name;
      foundContract.startDate = startDate;
      foundContract.endDate = endDate;
      foundContract.amount = amount;
      foundContract.paymentDate = paymentDate;
      foundContract.comments = comments;
      foundContract.status = status;

      await foundContract.save();
      sendUserEmail(
        confirmContract(name, foundContract.UserId, foundContract.id),
        email
      );

      return res.json({
        msg: "tu información de contrato ha sido actualizada",
      });
    }
  } catch (err) {
    next(err);
  }
}

async function deleteContract(req, res, next) {
  const idContract = req.query.id;

  const tiempoTranscurrido = Date.now();
  const fecha = new Date(tiempoTranscurrido);
  const mes = fecha.getMonth() + 1;
  const año = fecha.getFullYear();
  const dia = fecha.getDate();

  const modifyAndDelete = async (contract) => {
    contract.Property.available = true;
    await contract.Property.save();
    contract.destroy();
    return res.json({
      msg: "se elimino su contrato exitosamente",
    });
  };

  try {
    const contract = await Contract.findByPk(idContract, {
      include: {
        model: Property,
      },
    });

    const finContrato = contract.endDate;

    if (finContrato.slice(0, 4) <= año) {
      if (finContrato.slice(0, 4) < año) {
        return modifyAndDelete(contract);
      }
      if (finContrato.slice(5, 7) <= mes) {
        if (finContrato.slice(5, 7) < mes) {
          return modifyAndDelete(contract);
        }
        if (finContrato.slice(8, 10) < dia) {
          return modifyAndDelete(contract);
        }
      }
    } else {
      return res.json({
        msg: "disculpe el contrato aun no expiró",
      });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  newContract,
  getContracts,
  getContractsById,
  editContract,
  deleteContract,
};
