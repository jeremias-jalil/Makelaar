import React, { useState } from "react";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import Tooltip from "@material-ui/core/Tooltip";
import { Dialog, DialogContent, DialogActions } from "@material-ui/core";
import { Button } from "@material-ui/core";
import FormLogin from "../FormLogin/FormLogin";
import FavoriteCards from "../Favorites/FavoritesCards/FavoriteCards";
import FormContraseña from "../FormContraseña/FormContraseña";

import style from "./TopBar.module.css";

const useStyles = makeStyles((theme) => ({
  paperList: {
    width: 500,
  },

  menuList: {
    width: "min-content",
    flexDirection: "row",
    display: "flex",
    margin: theme.spacing(5),
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  imgList: {
    width: "100%",
    height: 400,
  },

  button: {
    color: "white",
    fontWeight: "bold",
    fontSize: "12px",
    marginBottom: "20px",
    marginTop: "12px",
    padding: "6px",
    marginLeft: theme.spacing(40),
    float: "right",
  },
  icon: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}));

export default function TopBar() {
  const LoginModal = (props) => {
    return (
      <Dialog open={showDialog} onClose={closeDialog}>
        <DialogContent>
          <Button
            className={classes.button}
            size="small"
            variant="contained"
            color="primary"
            type="submit"
            onClick={closeDialog}
          >
            X
          </Button>
          <FormLogin action={closeDialog} />
        </DialogContent>
        <DialogActions>
          <Button onClick={openDialogReset} autoFocus color="primary">
            ¿Olvidaste tu contraseña?
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  const ResetModal = (props) => {
    return (
      <Dialog open={showDialogReset} onClose={closeDialogReset}>
        <DialogContent>
          <Button
            className={classes.button}
            size="small"
            variant="contained"
            color="primary"
            type="submit"
            onClick={closeDialogReset}
          >
            X
          </Button>
          <FormContraseña action={closeDialogReset} />
        </DialogContent>
      </Dialog>
    );
  };

  ///// -- Login dialog
  const [showDialog, setShowDialog] = useState(false);

  const openDialog = () => setShowDialog(true);
  const closeDialog = () => setShowDialog(false);

  ///// --Reset password dialog.
  const [showDialogReset, setShowDialogReset] = useState(false);

  const openDialogReset = () => setShowDialogReset(true);

  const closeDialogReset = () => setShowDialogReset(false);

  ////
  const [showFav, setShowFav] = useState(false);

  const openFav = () => setShowFav(true);
  const closeFav = () => setShowFav(false);

  // const handleToggle = () => {
  //     setOpen((prevOpen) => !prevOpen);
  // };

  const classes = useStyles();

  return (
    <div className={style.containerTopBar}>
      <div className={style.containerContact}>
        <IconButton className={classes.icon}>
          <WhatsAppIcon className={classes.icon} />
          <Typography>+549 11456982365</Typography>
        </IconButton>

        <IconButton className={classes.icon}>
          <MailOutlineIcon className={classes.icon} />
          <Typography>
            <a href="mailto:info_makelaar@yahoo.com" className={style.mail}>
              info_makelaar@yahoo.com
            </a>
          </Typography>
        </IconButton>
      </div>

      <div className={style.containerIcons}>
        <Tooltip title="favoritos">
          <IconButton className={classes.icon} arial-label="app">
            <FavoriteBorderIcon onClick={openFav} className={classes.icon} />
            <Dialog open={showFav} onClose={closeFav}>
              <DialogContent>
                <Button
                  className={classes.button}
                  size="small"
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={closeFav}
                >
                  X
                </Button>
                <FavoriteCards />
              </DialogContent>
            </Dialog>
          </IconButton>
        </Tooltip>

        <Tooltip title="Ingresar">
          <IconButton arial-label="app" className={classes.icon}>
            <PermIdentityIcon onClick={openDialog} className={classes.icon} />
            <LoginModal
              open={openDialog}
              handleClose={() => setShowDialog(false)}
            />
            <ResetModal
              open={openDialogReset}
              handleClose={() => setShowDialogReset(false)}
            />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}
