import { authProvider } from "../authProvider/authProvider";

const apiUrl = process.env.REACT_APP_URL;


export const dataProvider = {
  getList: (resource, params) => {
    const token = localStorage.getItem("token");
    authProvider.getPermissions();
    let query = `/admin/get`;
    const key =
      resource[resource.length - 1] !== "s" ? resource + "s" : resource;
    if (resource === "account") {
      query = `/admin/get`;
    } else if (resource === "order") {
      query = `/admin/orders/info`;
      resource = "clothes-to-order";
    } else {
      query = ``;
    }
    const request = new Request(apiUrl + `api/` + resource + query, {
      method: "GET",
      body: null,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (resource !== "clothes-to-order") {
      return fetch(request)
        .then(async (response) => {
          if (response.status < 200 || response.status >= 300) {
            throw new Error(response.statusText);
          }
          const json = await response.json();
          const data = json[key];
          for (let i = 0; i < data.length; i++) {
            data[i].id = data[i]._id;
            delete data[i]._id;
          }
          return { data: data, total: data.length };
        })
        .catch(() => {
          throw new Error("Network error");
        });
    } else {
      return fetch(request)
        .then(async (response) => {
          if (response.status < 200 || response.status >= 300) {
            throw new Error(response.statusText);
          }
          const json = await response.json();
          const data = json[key];
          for (let i = 0; i < data.length; i++) {
            data[i].id = data[i]._id;
            delete data[i]._id;
          }
          return { data: data, total: data.length };
        })
        .catch(() => {
          throw new Error("Network error");
        });
    }
  },

  getOne: async (resource, params) => {
    const token = localStorage.getItem("token");
    let query = "";
    const key =
      resource[resource.length - 1] !== "s" ? resource + "s" : resource;
    if (resource === "account") {
      query = `/admin/find?_id=${params.id}`;
    } else if (resource === "order") {
      query = `/admin/find?_id=${params.id}`;
    } else {
      query = `/find?_id=${params.id}`;
    }
    const request = new Request(apiUrl + `api/` + resource + query, {
      method: "GET",
      body: null,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return fetch(request)
      .then(async (response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        const json = await response.json();
        const data = json[key][0];
        data.id = data._id;
        delete data._id;
        return { data: data };
      })
      .catch(() => {
        throw new Error("Network error");
      });
  },

  update: async (resource, params) => {
    const token = localStorage.getItem("token");
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    let query = "";
    let body = {};
    const key = resource;
    if (resource === "account") {
      query = "/admin/update/role";
      body = { _id: params.id, role: params.data.role };
    } else {
      query = "/update";
      if (resource === "clothes") {
        body = {
          _id: params.data.id,
          name: params.data.name,
          color: params.data.color,
          type: params.data.type,
          price: params.data.price,
          company: params.data.company,
          sale: params.data.sale,
          material: params.data.material,
          care: params.data.care,
          clothesCount: params.data.clothesCount,
          sex: params.data.sex,
          collection_id: params.data.collection_id._id,
        };
      } else if (resource === "collection") {
        body = {
          _id: params.data.id,
          name: params.data.name,
          description: params.data.description,
        };
      } else if (resource === "order") {
        body = {
          _id: params.id,
          status: params.data.status,
          invoice: params.data.invoice,
        };
      }
    }
    const formData = new FormData();
    body = JSON.stringify(body);
    if ((resource === "collection" || resource === "clothes") && body && params.data.pictures) {
      const images = [];
      params.data.pictures.map((item) => {
        images.push(item.rawFile);
      });
      formData.append("data", body);
      for (let i = 0; i < images.length; i++) {
        formData.append("pic", images[i]);
  
      }
      headers = {
        Authorization: `Bearer ${token}`,
      };
      body = formData;
    }
    const request = new Request(apiUrl + `api/` + resource + query, {
      method: "PUT",
      body: body,
      headers: headers,
    });
    return fetch(request)
      .then(async (response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        const json = await response.json();
        const data = json[key];
        data.id = data._id;
        delete data._id;
        return { data: data };
      })
      .catch(() => {
        throw new Error("Network error");
      });
  },

  create: (resource, params) => {
    const token = localStorage.getItem("token");
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    let query = "";
    let body = {};
    const key = resource;
    if (resource === "clothes") {
      query = "/create";
      if (!params.data.collection_id._id) {
        params.data.collection_id._id = undefined
      }
      body = {
          name: params.data.name,
          images: params.data.images,
          color: params.data.color,
          type: params.data.type,
          price: params.data.price,
          company: params.data.company,
          sale: params.data.sale,
          material: params.data.material,
          care: params.data.care,
          clothesCount: params.data.clothesCount,
          sex: params.data.sex,
          collection_id: params.data.collection_id._id,
          isModeling: params.data.isModeling
      };
    } else if (resource === "collection") {
      query = "/create";
      body = {
        name: params.data.name,
        description: params.data.description,
      };
    }
    const formData = new FormData();
    body = JSON.stringify(body);
    if ((resource === "collection" || resource === "clothes") && body && params.data.pictures) {
      const images = [];
      params.data.pictures.map((item) => {
        images.push(item.rawFile);
      });
      formData.append("data", body);
      for (let i = 0; i < images.length; i++) {
        formData.append("pic", images[i]);
      }
      headers = {
        Authorization: `Bearer ${token}`,
      };
      body = formData;
    }
    const request = new Request(apiUrl + `api/` + resource + query, {
      method: "POST",
      body: body,
      headers: headers,
    });
    return fetch(request)
      .then(async (response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        const json = await response.json();
        const data = json[key];
        data.id = data._id;
        delete data._id;
        return { data: data };
      })
      .catch(() => {
        throw new Error("Network error");
      });
  },

  delete: async (resource, params) => {
    const token = localStorage.getItem("token");
    let query = "/admin/delete";
    const key = resource;
    if (resource === "account") {
      query = "/admin/delete";
    } else {
      query = "/delete";
    }
    let body = { _id: params.id };
    body = JSON.stringify(body);
    const request = new Request(apiUrl + `api/` + resource + query, {
      method: "DELETE",
      body: body,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return fetch(request)
      .then(async (response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        const json = await response.json();
        const data = json[key];
        data.id = data._id;
        delete data._id;
        return { data: data };
      })
      .catch(() => {
        throw new Error("Network error");
      });
  },
};
