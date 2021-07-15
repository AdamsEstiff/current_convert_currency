<script>
import axios from "axios"
export default ({
    data(){
        return{
            apiKey:'e464bec0eef0658da85b',
            currencies:{},
            response:{},
            result:0,
            amount:0,
            loading:false, 
            convert:'USD',
            converting:'EUR',
            number:0 
        }
    },
    methods:{
        getData(){
            const currencies = localStorage.getItem('currencies');
                if(currencies){
                    this.currencies=JSON.parse(currencies);
                }    
                axios.get("https://free.currconv.com/api/v7/currencies?apiKey="+this.apiKey) 
                .then((response) => {
                    this.currencies=response.data.results;
                    localStorage.setItem('currencies', JSON.stringify(response.data.results));
                   
                })
        },
           convertCurrency(){
            this.loading=true;
            axios.get('https://free.currconv.com/api/v7/convert?q='+this.convert+'_'+this.converting+'&apiKey='+this.apiKey)
            .then((response)=>{
                this.loading=false;
                this.response=response;
                this.result=response.data.results[this.convert+'_'+this.converting].val;
            })
        }
    },
    computed:{
        formattedCurrencies(){
            return Object.values(this.currencies);
        },
        calculateResult(){
            return Number(this.amount)*(this.result).toFixed(2);
        }

    },
       watch:{
        convert(){
            this.result=0;
        },
        converting(){
            this.result=0;
        }
    },
    mounted(){
        this.getData();
    }
})
</script>


