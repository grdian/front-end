// Pre-Fetch Blank Object States

export const nullUser = {
  id: -1,
  firstName: "grdian User",
  lastName: "",
  imgURL: "/images/portraits/portrait_genericDefault.jpg",
  phoneNumber: "",
  emailAddress: "",
  activeAlertId: -1,
  grdians: []
};

export const nullGrdianList = [nullUser];

export const nullAlert = {
  id: -1,
  senderId: -1,
  timeStamp: "",
  urgency: "",
  message: "blank message",
  latitude: 0,
  longitude: 0,
  senderFirstName: "Nobody",
  senderLastName: "",
  resolved: false
};

export const nullAlertList = [nullAlert];

export const nullSignUpForm = {
  firstName: "",
  lastName: "",
  imgURL: "",
  phoneNumber: "",
  emailAddress: "",
  password: ""
};

export const nullLoginForm = {
  emailAddress: "",
  password: ""
};

export const URGENCY_LEVELS = ["EMERGENCY", "HIGH", "Moderate", "Minor"];

export const defaultNewAlertForm = {
  message: "I need help ASAP!",
  urgency: URGENCY_LEVELS[0]
};

// API Fetching Paths
export const BASE_API_PATH = "http://192.168.2.80:8080/api/";
export const REQUEST_ALL_GRDIANS = "allgrdians";
export const REQUEST_GRDIANS_OF_USER = "grdians";
export const REQUEST_ALL_ALERTS = "allalerts";
export const REQUEST_ACTIVE_ALERTS = "activealerts";
export const REQUEST_LOGIN = "login";
export const REQUEST_RESOLVE_ALERT = "allalerts/resolve";
export const REQUEST_LINK_GRDIANS = "allgrdians/link";
export const REQUEST_UNLINK_GRDIANS = "allgrdians/unlink";

export async function postCreateNewAlert(
  senderId,
  message,
  urgency,
  location,
  latitude,
  longitude
) {
  let api = BASE_API_PATH;
  let request = REQUEST_ALL_ALERTS;
  let postBody = {
    senderId: senderId,
    message: message,
    urgency: urgency,
    location: location,
    latitude: latitude,
    longitude: longitude
  };
  let dataPromise = postRequestToAPI(api, request, postBody);
  return dataPromise;
}

export async function postCreateNewGrdian(
  firstName,
  lastName,
  imgURL,
  phoneNumber,
  emailAddress,
  password
) {
  let api = BASE_API_PATH;
  let request = REQUEST_ALL_GRDIANS;
  let postBody = {
    firstName: firstName,
    lastName: lastName,
    imgURL: imgURL,
    phoneNumber: phoneNumber,
    emailAddress: emailAddress,
    password: password
  };
  let dataPromise = postRequestToAPI(api, request, postBody);
  return dataPromise;
}

export async function postUnlinkGrdians(userId, grdianId) {
  let api = BASE_API_PATH;
  let request = REQUEST_UNLINK_GRDIANS;
  let postBody = { userId: userId, grdianId: grdianId };
  let dataPromise = postRequestToAPI(api, request, postBody);
  return dataPromise;
}

export async function postLinkGrdians(userId, grdianId) {
  let api = BASE_API_PATH;
  let request = REQUEST_LINK_GRDIANS;
  let postBody = { userId: userId, grdianId: grdianId };
  let dataPromise = postRequestToAPI(api, request, postBody);
  return dataPromise;
}

export async function postResolveAlert(alertId) {
  let api = BASE_API_PATH;
  let request = REQUEST_RESOLVE_ALERT;
  let postBody = { id: alertId };
  let dataPromise = postRequestToAPI(api, request, postBody);
  return dataPromise;
}

export async function postRequestToAPI(api, request, postBody) {
  try {
    let response = await fetch(api + request, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(postBody)
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    let dataPromise = await response.json();
    return dataPromise;
  } catch (exception) {
    console.log("Post Exception: " + exception.message);
  }
}

export async function getAllGrdians() {
  let dataPromise = getRequest(REQUEST_ALL_GRDIANS);
  return dataPromise;
}

export async function getSpecificGrdian(userId) {
  let dataPromise = getRequest(REQUEST_ALL_GRDIANS + "/" + userId);
  return dataPromise;
}

export async function getGrdiansOfUser(userId) {
  let dataPromise = getRequest(REQUEST_GRDIANS_OF_USER + "/" + userId);
  return dataPromise;
}

export async function getAllAlerts() {
  let dataPromise = getRequest(REQUEST_ALL_ALERTS);
  return dataPromise;
}

export async function getSpecificAlert(alertId) {
  let dataPromise = getRequest(REQUEST_ALL_ALERTS + "/" + alertId);
  return dataPromise;
}

export async function getActiveAlertsOfUser(userId) {
  let dataPromise = getRequest(REQUEST_ACTIVE_ALERTS + "/" + userId);
  return dataPromise;
}

export async function getSpecificGrdianByEmail(userEmail) {
  let dataPromise = getRequest(REQUEST_LOGIN + "/" + userEmail);
  return dataPromise;
}

export async function getRequest(request) {
  return getRequestFromAPI(BASE_API_PATH, request);
}

export async function getRequestFromAPI(api, request) {
  try {
    let response = await fetch(api + request);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    let dataPromise = await response.json();
    return dataPromise;
  } catch (exception) {
    console.log("Get Request Exception: " + exception.message);
  }
}
