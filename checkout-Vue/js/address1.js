new Vue({
	el:"#app",
	data: {
		limitNum:3,
		addressIndex: 0,
		addressList: [],
		isNextFlag: false,
		loadMoreFlag: false,
		shippingMethod:1
	},
	mounted:function(){
		this.$nextTick(function(){
			this.queryAddress()
		})
	},
	computed:{
		filteAddress:function(){
			return this.addressList.slice(0,this.limitNum)
		}
	},
	methods:{
		queryAddress: function(){
			var _this=this;
			this.$http.get("data/address.json").then(response=>{
				var res=response.data;
				if(res.status=="0"){
					this.addressList=res.result;	
					console.log(this.addressList)	
				}
						
			})
		},
		loadmoreData:function(){
			this.loadMoreFlag = !this.loadMoreFlag;
			if(this.loadMoreFlag){
				this.limitNum=this.addressList.length;
			}else{
				this.limitNum=3;
			}
		},
		setDefaultAddress:function(addrId){
			this.addressList.forEach(item=>{
				if(item.addressId==addrId){
					item.isDefault=true
				}else{
					item.isDefault=false
				}
			console.log(item.addressId+"::"+item.isDefault);
			})
		}
	}
})
