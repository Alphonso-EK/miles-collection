const IMG='assets/';
const MC={PK:'mc_products_v1',SK:'mc_settings_v1',
 defSettings:{whatsapp:'260970444582',password:'miles2026',currency:'K',headline:'NEW ARRIVALS'},
 defProducts:[
 {id:1,name:'Black Leather Varsity',cat:'Jackets',price:950,sizes:'M, L, XL',img:IMG+'leather-varsity.jpg',desc:'Padded faux-leather varsity with striped rib cuffs and a stitched chest badge.'},
 {id:2,name:'Red Pearl Varsity',cat:'Jackets',price:850,sizes:'M, L, XL',img:IMG+'red-varsity.jpg',desc:'Red wool body, white sleeves and hand-set pearl lettering.'},
 {id:3,name:'Green Easy Life Varsity',cat:'Jackets',price:900,sizes:'M, L, XL',img:IMG+'green-varsity.jpg',desc:'Forest green with cream sleeves, embroidered patches and gold trim.'},
 {id:4,name:'Cream & Brown Moto Jacket',cat:'Jackets',price:800,sizes:'S, M, L',img:IMG+'brown-moto.jpg',desc:'Two-tone leather-look zip jacket with script chest lettering.'},
 {id:5,name:'Checkerboard Work Jacket',cat:'Jackets',price:750,sizes:'M, L, XL',img:IMG+'checker-jacket.jpg',desc:'Black and white checker print with distressed fade and a collar.'},
 {id:6,name:'Pink Racing Jacket',cat:'Jackets',price:1100,sizes:'S, M, L',img:IMG+'pink-racing.jpg',desc:'Pink and white racing-style zip jacket with raised lettering and patches.'},
 {id:7,name:'Pearl Quilted Bomber Set',cat:'Outfits',price:1200,sizes:'M, L, XL',img:IMG+'flatlay.jpg',desc:'Quilted pearl bomber, light-wash pearl jeans and black sneakers.'},
 {id:8,name:'Graphic Tees',cat:'Tees',price:250,sizes:'M, L, XL, XXL',img:IMG+'tees.jpg',desc:'Oversized heavyweight tees in black and white with bold prints.'},
 {id:9,name:'Crazy Zip Low, Black and Sand',cat:'Sneakers',price:1400,sizes:'40 to 46',img:IMG+'crazy-adidas.jpg',desc:'Sculpted low-top with a front zip and sand midsole.'},
 {id:10,name:'Gel Runner, Brown and Cream',cat:'Sneakers',price:1300,sizes:'38 to 45',img:IMG+'asics-brown.jpg',desc:'Retro runner in mesh and suede, boxed and tagged.'},
 {id:11,name:'Gel Runner, Black and Silver',cat:'Sneakers',price:1300,sizes:'38 to 45',img:IMG+'asics-black.jpg',desc:'Black suede and silver overlays on a stacked gel sole.'},
 {id:12,name:'Gel Runner, Grey and White',cat:'Sneakers',price:1300,sizes:'38 to 45',img:IMG+'asics-grey.jpg',desc:'Soft grey suede with a clean white mesh upper.'}],
 get(k,d){try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}},
 set(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true}catch(e){alert('Storage full. Use smaller images.');return false}},
 all(){return this.get(this.PK,this.defProducts).map(p=>({stock:10,status:'active',video:'',sku:'MC-'+String(p.id).slice(-4).padStart(4,'0'),...p}))},
 products(){return this.all().filter(p=>p.status!='draft').map(p=>({...p,soldout:!!p.soldout||p.stock<=0}))},
 saveProducts(p){return this.set(this.PK,p)},
 settings(){return Object.assign({},this.defSettings,this.get(this.SK,{}))},
 saveSettings(s){return this.set(this.SK,s)},
 orders(){const l=this.get('mc_orders',[]);return l.map((o,i)=>({status:'Pending',phone:'',method:'WhatsApp',items:[],lines:[],...o,id:o.id||'#ORD-'+(1000+l.length-i),ts:o.ts||Date.parse(o.date)||0}))},
 saveOrders(l){return this.set('mc_orders',l)},
 addOrder(o){const l=this.orders(),n=Math.max(1000,...l.map(x=>+String(x.id).replace(/\D/g,'')||0))+1;const r={...o,id:'#ORD-'+n,ts:Date.now(),date:new Date().toLocaleString(),status:o.status||'Pending'};this.saveOrders([r,...l].slice(0,500));return r},
 promos(){return this.get('mc_promos',[])},
 ss:{get(k){try{return sessionStorage.getItem(k)}catch(e){return window['_'+k]}},set(k,v){try{sessionStorage.setItem(k,v)}catch(e){window['_'+k]=v}},del(k){try{sessionStorage.removeItem(k)}catch(e){delete window['_'+k]}}}
};
MC.videos=function(){return this.get('mc_videos',[{id:1,title:'Store tour',sku:'MC-VID-001',thumb:IMG+'poster.jpg',src:IMG+'store-tour.mp4',status:'Published',views:0,secs:0,dur:107}])};
MC.track=function(id,secs){const v=this.videos(),x=v.find(a=>a.id==id);if(!x)return;if(secs)x.secs+=secs;else{x.views++;const d=this.get('mc_daily',{}),k=new Date().toISOString().slice(0,10);d[k]=(d[k]||0)+1;this.set('mc_daily',d)}this.set('mc_videos',v)};
MC.imgs=function(p){if(p.imgs&&p.imgs.length)return p.imgs;const d=p.img.replace('.jpg','-detail.jpg');return p.img.startsWith('assets/')&&!p.img.includes('detail')&&!['look-pink','store-kaws','owner'].some(x=>p.img.includes(x))?[p.img,d]:[p.img]};
