export interface Airport {
  skyId: string;
  entityId: string;
  presentation: {
    tittle: string;
    suggestrionTitle: string;
    subtitle: string;
  };
}

export interface Flight {
  flight_id: string;
  price: number;
  airline: string;
  departure: {
    city: string;
    airport: string;
    time: Date;
  };
  arrival: {
    city: string;
    airport: string;
    time: Date;
  };
  class: string;
  people: {
    adults: number;
    children: number;
    infantsInSeat: number;
    infantsOnLap: number;
  };
  duration: string;
  totalPrice: number;
  totalPeople: number;
  tripType: string;
}
