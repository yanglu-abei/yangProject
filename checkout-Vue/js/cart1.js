new Vue({
	el:"#app",
	data:{
		totalMoney:0,
		produstlist:[],
		checkAll:false,
		showModal:false,
		curProduct:''
	},
	filters:{
		 formatMoney:function(value){
			return "￥" + value.toFixed(2);
		}
	},
	mounted: function () {
		this.cartView();
	},
	methods:{
		cartView: function () {
			// var _this = this;
			// this.$http.get("data/cartData.json").then(function(res){
			// 	this.produstlist=res.data.result.list;
			// });
			this.$http.get("data/cartData.json").then(res=>{
				this.produstlist=res.data.result.list;
				//this.totalMoney=res.data.result.totalMoney;
			});
		},
		checkMoney:function(product,way){
			if(way>0){
				product.productQuentity++
			}else{
				product.productQuentity--
				if(product.productQuentity<0){
					product.productQuentity=0
				}
			}
			this.calcTotalMoney()
		},
		selectProduct:function(product){
			if(typeof product.checked == "undefined"){
				Vue.set(product,'checked',true)
			}else{
				product.checked =!product.checked
			}
			this.calcTotalMoney()
			this.isCheckAll()


		},
		isCheckAll:function(){
			let flag = true;
			this.produstlist.forEach(item=>{
				if(!item.checked){
					flag = false
				}
			})
			if(flag){
					this.checkAll=true;
				}else{
					this.checkAll=false;
				}
		},
		selectAll:function(isCheck){
			this.checkAll = isCheck;
			this.produstlist.forEach(function(item){
				if(typeof item.checked == "undefined"){
					Vue.set(item,'checked',isCheck)
				}else{
					item.checked=isCheck
				}
			})
			this.calcTotalMoney()
		},
		calcTotalMoney:function(){
			var totalMoney=0
			var that=this;
			this.produstlist.forEach(item=>{
				if(item.checked){
					totalMoney+=item.productPrice*item.productQuentity
				}
				this.totalMoney=totalMoney;
			})
		},
		delConfirm:function(product){
			this.showModal=true;
			this.curProduct=product;
		},
		delcurrentProduct:function(){
			this.showModal=false;
			var index=this.produstlist.indexof(this.curProduct);
			this.produstlist.splice(index,1)
		}
	}
})
Vue.filter('money',function(value,type){
	return "￥" + value.toFixed(2)+type;
})