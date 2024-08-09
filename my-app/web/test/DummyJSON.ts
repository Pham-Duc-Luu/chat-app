import axios from 'axios';

const exampleUser = {
  id: 1,
  firstName: 'Emily',
  lastName: 'Johnson',
  maidenName: 'Smith',
  age: 28,
  gender: 'female',
  email: 'emily.johnson@x.dummyjson.com',
  phone: '+81 965-431-3024',
  username: 'emilys',
  password: 'emilyspass',
  birthDate: '1996-5-30',
  image: '...',
  bloodGroup: 'O-',
  height: 193.24,
  weight: 63.16,
  eyeColor: 'Green',
  hair: {
    color: 'Brown',
    type: 'Curly',
  },
  ip: '42.48.100.32',
  address: {
    address: '626 Main Street',
    city: 'Phoenix',
    state: 'Mississippi',
    stateCode: 'MS',
    postalCode: '29112',
    coordinates: {
      lat: -77.16213,
      lng: -92.084824,
    },
    country: 'United States',
  },
  macAddress: '47:fa:41:18:ec:eb',
  university: 'University of Wisconsin--Madison',
  bank: {
    cardExpire: '03/26',
    cardNumber: '9289760655481815',
    cardType: 'Elo',
    currency: 'CNY',
    iban: 'YPUXISOBI7TTHPK2BR3HAIXL',
  },
  company: {
    department: 'Engineering',
    name: 'Dooley, Kozey and Cronin',
    title: 'Sales Manager',
    address: {
      address: '263 Tenth Street',
      city: 'San Francisco',
      state: 'Wisconsin',
      stateCode: 'WI',
      postalCode: '37657',
      coordinates: {
        lat: 71.814525,
        lng: -161.150263,
      },
      country: 'United States',
    },
  },
  ein: '977-175',
  ssn: '900-590-289',
  userAgent:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',
  crypto: {
    coin: 'Bitcoin',
    wallet: '0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a',
    network: 'Ethereum (ERC20)',
  },
  role: 'admin', // or "moderator", or "user"
};

export type ExampleUser = typeof exampleUser;

const examplePost = {
  id: 1,
  title: 'His mother had always taught him',
  body: "His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or who had less money than him. But the stupidity of the group of people he was talking to made him change his mind.",
  tags: ['history', 'american', 'crime'],
  reactions: {
    likes: 192,
    dislikes: 25,
  },
  views: 305,
  userId: 121,
};

export type ExamplePost = typeof examplePost;
class User {
  private user;
  constructor(url: string) {
    this.user = axios.create({ baseURL: url + '/users' });
  }
  async getAllUsers() {
    return this.user.get<{
      users: (typeof exampleUser)[];
      total: number;
      skip: number;
      limit: number;
    }>('/');
  }
  async getUserById(id: number = 1) {
    return this.user.get<typeof exampleUser>(`/${id}`);
  }
}

class Post {
  private post;
  constructor(url: string) {
    this.post = axios.create({ baseURL: url + '/posts' });
  }

  async getAllPosts() {
    return this.post.get<{
      posts: (typeof examplePost)[];
      total: number;
      skip: number;
      limit: number;
    }>('/');
  }

  async getPostById(id: number = 1) {
    return this.post.get<typeof examplePost>(`/${id}`);
  }
}

class Image {
  private image;
  constructor(url: string) {
    this.image = axios.create({ baseURL: url + '/image' });
  }

  async generateImage(props: {
    width: number;
    height: number;
    background?: string;
    color?: string;
    text?: string;
    type?: 'webp' | 'png' | 'gif' | 'jpg' | 'jpeg';
  }) {
    let url = `/${props.width}x${props.height}`;
    if (props.background) {
      url += `/${props.background}`;
    }
    if (props.color) {
      url += `/${props.color}`;
    }
    if (props.text) {
      url += `?text=${props.text}`;
    }
    return this.image.get(url, {
      responseType: 'blob', // Ensure the response is treated as binary data (blob)
    });
  }
}
class DummyJSON {
  private baseURL = 'https://dummyjson.com';
  public api = axios.create({ baseURL: this.baseURL });
  public user = new User(this.baseURL);
  public post = new Post(this.baseURL);
  public image = new Image(this.baseURL);
}

const dummyjson = new DummyJSON();
export default dummyjson;
