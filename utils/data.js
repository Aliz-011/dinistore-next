import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'dini',
      email: 'diniabshari@gmail.com',
      password: bcrypt.hashSync('dinimanis'),
      isAdmin: true,
    },
    {
      name: 'alief',
      email: 'aliefputra@gmail.com',
      password: bcrypt.hashSync('alizia011'),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Brownies',
      slug: 'brownies',
      category: 'cake',
      img: 'https://firebasestorage.googleapis.com/v0/b/dinistore-b41e5.appspot.com/o/images%2Fbrownieswaktuulangtahun.jpeg?alt=media&token=a479798c-a200-48ac-b29e-520b77ee50eb',
      price: 140000,
      rating: 4.8,
      numReviews: 23,
      countInStock: 5,
      desc: 'Brownies panggang rasa coklat yang nikmat.',
    },
    {
      name: 'Pie Buah',
      slug: 'pie-buah',
      category: 'snack',
      img: 'https://firebasestorage.googleapis.com/v0/b/dinistore-b41e5.appspot.com/o/images%2FResep-Pie-Buah.jpeg?alt=media&token=6110310b-c562-4b11-b478-c6d565a8faf2',
      price: 8000,
      rating: 4.5,
      numReviews: 30,
      countInStock: 100,
      desc: 'Pie buah dengan rasa manis yang enak dan menyegarkan.',
    },
    {
      name: 'Risoles',
      slug: 'risoles',
      category: 'snack',
      img: 'https://firebasestorage.googleapis.com/v0/b/dinistore-b41e5.appspot.com/o/images%2Frisoles.jpeg?alt=media&token=027b2cb2-0013-419a-bc74-8a6fdbbf9fa6',
      price: 4000,
      rating: 4.8,
      numReviews: 8,
      countInStock: 20,
      desc: 'Risoles yang dibuat mamanya dini.',
    },
    {
      name: 'Donat',
      slug: 'donat',
      category: 'snack',
      img: 'https://firebasestorage.googleapis.com/v0/b/dinistore-b41e5.appspot.com/o/images%2Fdonat.jpeg?alt=media&token=e3b40c19-651f-4ec0-86a0-200a12ae5036',
      price: 5000,
      rating: 4.7,
      numReviews: 14,
      countInStock: 20,
      desc: 'Donat bulat enak.',
    },
    {
      name: 'Bakpao',
      slug: 'bakpao',
      category: 'snack',
      img: 'https://firebasestorage.googleapis.com/v0/b/dinistore-b41e5.appspot.com/o/images%2Fimages_mancanegara_dim-sum_bakpao-ayam.jpeg?alt=media&token=808ccaab-cb5e-4e36-b1e8-91db6e7b3d61',
      price: 5000,
      rating: 4.8,
      numReviews: 25,
      countInStock: 20,
      desc: 'Bakpao enak.',
    },
    {
      name: 'Rainbow Cake',
      slug: 'rainbow-cake',
      category: 'cake',
      img: 'https://firebasestorage.googleapis.com/v0/b/dinistore-b41e5.appspot.com/o/images%2Frainbow-cake-foto-resep-utama.jpeg?alt=media&token=13f6b34d-34b2-4a71-aea9-6bd0fa3d882a',
      price: 150000,
      rating: 4.8,
      numReviews: 20,
      countInStock: 4,
      desc: 'kue yang banyak disukai orang apalagi komunitas LGBT',
    },
  ],
};

export default data;
