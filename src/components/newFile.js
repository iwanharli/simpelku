import axios from 'axios';

export default (await import('vue')).defineComponent({
name: 'LoginPage',
data() {
return {
email: '',
password: ''
};
},
methods: {
try: {
async handleSubmit() {
const response = await axios.post('api/v1/user/login', {
email: this.email,
password: this.password
});

localStorage.setItem('token', response.data.data.token_jwt);

// localStorage.setItem('authenticated', true)
console.log('STATUS     :', response.data.meta.code);
console.log('MSG        :', response.data.meta.message);
console.log('TOKEN JWT  :', response.data.data.token_jwt);
console.log('USER       :', response.data.data.data_user);

if (response.data.meta.code === 200) {
console.log('AMAN');
this.$router.push({ name: 'home' });
} else {
console.log('GA AMAN');
}
}
}, catch(error) {
console.error("An error occurred:", error);
// Handle error as needed
}
}
});
