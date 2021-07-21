<template>
  <div class="container ">
    <el-card class="card">
      <div class="card-body">
        <div class="card-title text-center">
          <h1>Convertidor de monedas</h1>
        </div>
        <el-row :gutter="24">
          <el-form v-model="form" ref="form">
            <el-col :span="12" :xl="12" :xs='24'>
              <el-form-item label="De">
                <el-select v-model="convert" filterable placeholder="Seleccionar">
                  <el-option
                      v-for="currency in currencies"
                      :key="currency.id"
                      :label="currency.currencyName"
                      :value="currency.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" :xl="12" :xs='24'>
              <el-form-item label="A">
                <el-select v-model="converting" filterable placeholder="Seleccionar">
                  <el-option
                      v-for="currency in currencies"
                      :key="currency.id"
                      :label="currency.currencyName"
                      :value="currency.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="Cantidad" prop="amount">
                <el-input-number :min="0" v-model="form.amount" placeholder="Inserte la cantidad"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="form.amount>0" class="mr-1">
              <el-button icon="el-icon-s-help" type="primary" :loading="loading" @click="convertCurrency()">
                Convertir
              </el-button>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </el-card>
    <el-card class="mt-4">
      <div class="row text-center">
        <div class="col-md-12">
          <h1> {{ calculateResult }}</h1>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import axios from "axios"

export default ({
  data() {
    return {
      apiKey: '9385|wQ05PS3hi5ZOhHXeu3ir^oz0uS4NguzH',
      currencies: {},
      response: {},
      result: 0,
      loading: false,
      form: {
        amount: 0
      },
      convert: 'USD',
      converting: 'EUR',
      number: 0
    }
  },
  methods: {
    getData() {
      const currencies = localStorage.getItem('currencies');
      if (currencies) {
        this.currencies = JSON.parse(currencies);
      }
      axios.get("https://free.currconv.com/api/v7/currencies?apiKey=" + this.apiKey)
          .then((response) => {
            this.currencies = response.data.results;
            localStorage.setItem('currencies', JSON.stringify(response.data.results));
          })
    },
    convertCurrency() {
          this.loading = true;
          axios.get('https://free.currconv.com/api/v7/convert?q=' + this.convert + '_' + this.converting + '&apiKey=' + this.apiKey).then((response) => {
              this.loading = false;
              console.log(response);
              this.response = response;
              this.result = response.data.results[this.convert + '_' + this.converting].val;
              console.log(this.response);
            
            }).catch(
              (e)=>{
                this.loading=false;
                 this.$message.error(''+e);              }
            ) 
    }
  },
  computed: {
    formattedCurrencies() {
      return Object.values(this.currencies);
    },
    calculateResult() {
      return Number(this.form.amount) * (this.result).toFixed(2);
    }

  },
  watch: {
    convert() {
      this.result = 0;
    },
    converting() {
      this.result = 0;
    }
  },
  mounted() {
    this.getData();
  }
})
</script>