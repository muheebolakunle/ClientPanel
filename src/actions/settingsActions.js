import {
  DISABLE_BALANCE_ON_ADD,
  DISABLE_BALANCE_ON_EDIT,
  ALLOW_REGISTRATION
} from "./types";

export const setDisableBalanceOnAdd = () => {
  //Get dettings from local storage
  const settings = JSON.parse(localStorage.getItem("settings"));

  //Toggle the value
  settings.disableBalanceOnAdd = !settings.disableBalanceOnAdd;

  //Save in Local storage
  localStorage.setItem("settings", JSON.stringify(settings));

  const { disableBalanceOnAdd } = settings;
  return {
    type: DISABLE_BALANCE_ON_ADD,
    payload: disableBalanceOnAdd
  };
};

export const setDisableBalanceOnEdit = () => {
  const settings = JSON.parse(localStorage.getItem("settings"));

  settings.disableBalanceOnEdit = !settings.disableBalanceOnEdit;

  localStorage.setItem("settings", JSON.stringify(settings));

  const { disableBalanceOnEdit } = settings;
  return {
    type: DISABLE_BALANCE_ON_EDIT,
    payload: disableBalanceOnEdit
  };
};

export const setAllowRegistration = () => {
  const settings = JSON.parse(localStorage.getItem("settings"));

  settings.allowRegistration = !settings.allowRegistration;

  localStorage.setItem("settings", JSON.stringify(settings));

  const { allowRegistration } = settings;
  return {
    type: ALLOW_REGISTRATION,
    payload: allowRegistration
  };
};
