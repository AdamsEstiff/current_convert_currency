<template>
    <div class="container ">
        <div class="card">
           
            <div class="card-body">
                <div class="card-title text-center">
                    <h1>Convertidor de monedas</h1> 
                </div>
                <div class="row">
                    <div class="col-md-6 mt-2">
                         <el-select v-model="convert" filterable placeholder="Seleccionar">
                            <el-option
                                v-for="currency in currencies"
                                :key="currency.id"
                                :label="currency.currencyName"
                                :value="currency.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="col-md-6 mt-2">
                        <el-select v-model="converting" filterable placeholder="Seleccionar">
                            <el-option
                                v-for="currency in currencies"
                                :key="currency.id"
                                :label="currency.currencyName"
                                :value="currency.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="col-md-12 mt-3">
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <el-input-number :controls="false" v-model="amount"></el-input-number>
                            </el-col>
                            <el-col :span="10" class="mr-1">
                               <button :disabled="loading" @click="convertCurrency()"  class="mt-2 btn btn-primary">
                                    Convertir
                                </button>
                            </el-col>
                        </el-row>

                    </div>
                    
                </div>
            </div>
            
        </div>
        <div class="card mt-5" >
            <div class="row text-center">
                <div class="col-md-12">
                   <h1> {{calculateResult}}</h1>
                </div>
            </div>
        </div>
    </div>
</template>
<script src="./../components/convert-currency.vue"></script>