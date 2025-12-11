import {
  useEffect,
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";

const CitiesContext = createContext();

const BASE_URL = "https://the-world-wise-production.up.railway.app";

const initialState = {
  cities: [],
  error: "",
  isLoading: false,
  currentCity: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payLoad };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payLoad };
    case "cities/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payLoad],
      };
    case "cities/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payLoad),
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payLoad,
      };
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payLoad: data });
      } catch {
        dispatch({
          type: "rejected",
          payLoad: "There was an error loading cities...",
        });
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;

      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/loaded", payLoad: data });
      } catch {
        dispatch({
          type: "rejected",
          payLoad: "There was an error loading data...",
        });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "cities/created", payLoad: data });
    } catch {
      dispatch({
        type: "rejected",
        payLoad: "There was an error creating city...",
      });
    }
  }
  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "cities/deleted", payLoad: id });
    } catch {
      dispatch({
        type: "rejected",
        payLoad: "There was an error deleting city...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  return context;
}
export { CitiesProvider, useCities };
