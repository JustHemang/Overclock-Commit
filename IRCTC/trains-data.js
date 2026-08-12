const TRAINS_DB = [
  { number:'12951', name:'Mumbai Rajdhani Express', type:'rajdhani', from:'NDLS', to:'BCT', depart:'16:25', arrive:'08:15+1', duration:'15:50', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'1A':{fare:4635,seats:8},'2A':{fare:2770,seats:20},'3A':{fare:1930,seats:40}}, route:[
    {code:'NDLS',name:'New Delhi',arrival:'--',departure:'16:25',distance:0,day:1,platform:1,halt:true},
    {code:'VGLJ',name:'V Lakshmibai Jhansi',arrival:'20:13',departure:'20:15',distance:331,day:1,platform:2,halt:true},
    {code:'BPL',name:'Bhopal Junction',arrival:'00:50',departure:'00:55',distance:701,day:2,platform:3,halt:true},
    {code:'BCT',name:'Mumbai Central',arrival:'08:15',departure:'--',distance:1384,day:2,platform:4,halt:true}
  ]},
  { number:'12952', name:'Mumbai Rajdhani Express', type:'rajdhani', from:'BCT', to:'NDLS', depart:'17:00', arrive:'08:35+1', duration:'15:35', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'1A':{fare:4635,seats:8},'2A':{fare:2770,seats:20},'3A':{fare:1930,seats:40}}, route:[
    {code:'BCT',name:'Mumbai Central',arrival:'--',departure:'17:00',distance:0,day:1,platform:1,halt:true},
    {code:'BPL',name:'Bhopal Junction',arrival:'00:45',departure:'00:50',distance:683,day:2,platform:2,halt:true},
    {code:'VGLJ',name:'V Lakshmibai Jhansi',arrival:'05:18',departure:'05:20',distance:1053,day:2,platform:3,halt:true},
    {code:'NDLS',name:'New Delhi',arrival:'08:35',departure:'--',distance:1384,day:2,platform:4,halt:true}
  ]},
  { number:'12301', name:'Howrah Rajdhani Express', type:'rajdhani', from:'HWH', to:'NDLS', depart:'17:00', arrive:'10:00+1', duration:'17:00', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'1A':{fare:4890,seats:8},'2A':{fare:2925,seats:20},'3A':{fare:2040,seats:40}}, route:[
    {code:'HWH',name:'Howrah Junction',arrival:'--',departure:'17:00',distance:0,day:1,platform:1,halt:true},
    {code:'GAYA',name:'Gaya Junction',arrival:'22:28',departure:'22:30',distance:468,day:1,platform:2,halt:true},
    {code:'MGS',name:'Mughal Sarai',arrival:'01:58',departure:'02:00',distance:691,day:2,platform:3,halt:true},
    {code:'NDLS',name:'New Delhi',arrival:'10:00',departure:'--',distance:1447,day:2,platform:4,halt:true}
  ]},
  { number:'12302', name:'Howrah Rajdhani Express', type:'rajdhani', from:'NDLS', to:'HWH', depart:'16:55', arrive:'09:55+1', duration:'17:00', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'1A':{fare:4890,seats:8},'2A':{fare:2925,seats:20},'3A':{fare:2040,seats:40}}, route:[
    {code:'NDLS',name:'New Delhi',arrival:'--',departure:'16:55',distance:0,day:1,platform:1,halt:true},
    {code:'MGS',name:'Mughal Sarai',arrival:'00:25',departure:'00:27',distance:756,day:2,platform:3,halt:true},
    {code:'GAYA',name:'Gaya Junction',arrival:'03:55',departure:'03:57',distance:979,day:2,platform:2,halt:true},
    {code:'HWH',name:'Howrah Junction',arrival:'09:55',departure:'--',distance:1447,day:2,platform:4,halt:true}
  ]},
  { number:'12433', name:'Chennai Rajdhani Express', type:'rajdhani', from:'NDLS', to:'MAS', depart:'20:55', arrive:'11:00+1', duration:'14:05', days:['Mon','Fri'], classes:{'1A':{fare:4450,seats:8},'2A':{fare:2660,seats:20},'3A':{fare:1855,seats:40}}, route:[
    {code:'NDLS',name:'New Delhi',arrival:'--',departure:'20:55',distance:0,day:1,platform:1,halt:true},
    {code:'BPL',name:'Bhopal Junction',arrival:'05:15',departure:'05:20',distance:701,day:2,platform:2,halt:true},
    {code:'NGP',name:'Nagpur Junction',arrival:'09:55',departure:'10:00',distance:1161,day:2,platform:3,halt:true},
    {code:'MAS',name:'Chennai Central',arrival:'11:00',departure:'--',distance:2180,day:2,platform:4,halt:true}
  ]},
  { number:'12434', name:'Chennai Rajdhani Express', type:'rajdhani', from:'MAS', to:'NDLS', depart:'20:30', arrive:'10:30+1', duration:'14:00', days:['Wed','Sat'], classes:{'1A':{fare:4450,seats:8},'2A':{fare:2660,seats:20},'3A':{fare:1855,seats:40}}, route:[
    {code:'MAS',name:'Chennai Central',arrival:'--',departure:'20:30',distance:0,day:1,platform:1,halt:true},
    {code:'NGP',name:'Nagpur Junction',arrival:'08:10',departure:'08:15',distance:1019,day:2,platform:3,halt:true},
    {code:'BPL',name:'Bhopal Junction',arrival:'12:25',departure:'12:30',distance:1479,day:2,platform:2,halt:true},
    {code:'NDLS',name:'New Delhi',arrival:'10:30',departure:'--',distance:2180,day:2,platform:4,halt:true}
  ]},
  { number:'12313', name:'Sealdah Rajdhani Express', type:'rajdhani', from:'SDAH', to:'NDLS', depart:'16:45', arrive:'10:00+1', duration:'17:15', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'1A':{fare:4890,seats:8},'2A':{fare:2925,seats:20},'3A':{fare:2040,seats:40}}, route:[
    {code:'SDAH',name:'Sealdah',arrival:'--',departure:'16:45',distance:0,day:1,platform:1,halt:true},
    {code:'MSP',name:'Malda Town',arrival:'22:10',departure:'22:12',distance:447,day:1,platform:2,halt:true},
    {code:'GAYA',name:'Gaya Junction',arrival:'02:25',departure:'02:27',distance:837,day:2,platform:3,halt:true},
    {code:'NDLS',name:'New Delhi',arrival:'10:00',departure:'--',distance:1457,day:2,platform:4,halt:true}
  ]},
  { number:'12314', name:'Sealdah Rajdhani Express', type:'rajdhani', from:'NDLS', to:'SDAH', depart:'16:55', arrive:'10:10+1', duration:'17:15', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'1A':{fare:4890,seats:8},'2A':{fare:2925,seats:20},'3A':{fare:2040,seats:40}}, route:[
    {code:'NDLS',name:'New Delhi',arrival:'--',departure:'16:55',distance:0,day:1,platform:1,halt:true},
    {code:'GAYA',name:'Gaya Junction',arrival:'01:28',departure:'01:30',distance:620,day:2,platform:2,halt:true},
    {code:'MSP',name:'Malda Town',arrival:'05:55',departure:'05:57',distance:1010,day:2,platform:3,halt:true},
    {code:'SDAH',name:'Sealdah',arrival:'10:10',departure:'--',distance:1457,day:2,platform:4,halt:true}
  ]},
  { number:'12309', name:'Rajendra Nagar Rajdhani', type:'rajdhani', from:'RJPB', to:'NDLS', depart:'17:35', arrive:'07:40+1', duration:'14:05', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'1A':{fare:4450,seats:8},'2A':{fare:2660,seats:20},'3A':{fare:1855,seats:40}}, route:[
    {code:'RJPB',name:'Rajendra Nagar Terminal',arrival:'--',departure:'17:35',distance:0,day:1,platform:1,halt:true},
    {code:'MGS',name:'Mughal Sarai',arrival:'22:18',departure:'22:20',distance:261,day:1,platform:3,halt:true},
    {code:'ALY',name:'Prayagraj Chheoki',arrival:'00:48',departure:'00:50',distance:410,day:2,platform:2,halt:true},
    {code:'NDLS',name:'New Delhi',arrival:'07:40',departure:'--',distance:989,day:2,platform:4,halt:true}
  ]},
  { number:'12310', name:'Rajendra Nagar Rajdhani', type:'rajdhani', from:'NDLS', to:'RJPB', depart:'19:30', arrive:'09:35+1', duration:'14:05', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'1A':{fare:4450,seats:8},'2A':{fare:2660,seats:20},'3A':{fare:1855,seats:40}}, route:[
    {code:'NDLS',name:'New Delhi',arrival:'--',departure:'19:30',distance:0,day:1,platform:1,halt:true},
    {code:'ALY',name:'Prayagraj Chheoki',arrival:'00:15',departure:'00:17',distance:579,day:2,platform:2,halt:true},
    {code:'MGS',name:'Mughal Sarai',arrival:'02:45',departure:'02:47',distance:728,day:2,platform:3,halt:true},
    {code:'RJPB',name:'Rajendra Nagar Terminal',arrival:'09:35',departure:'--',distance:989,day:2,platform:4,halt:true}
  ]},
  { number:'12953', name:'August Kranti Rajdhani', type:'rajdhani', from:'NDLS', to:'BCT', depart:'17:40', arrive:'11:25+1', duration:'17:45', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'1A':{fare:4635,seats:8},'2A':{fare:2770,seats:20},'3A':{fare:1930,seats:40}}, route:[
    {code:'NDLS',name:'New Delhi',arrival:'--',departure:'17:40',distance:0,day:1,platform:1,halt:true},
    {code:'VGLJ',name:'V Lakshmibai Jhansi',arrival:'22:18',departure:'22:20',distance:331,day:1,platform:2,halt:true},
    {code:'BPL',name:'Bhopal Junction',arrival:'02:55',departure:'03:00',distance:701,day:2,platform:3,halt:true},
    {code:'BCT',name:'Mumbai Central',arrival:'11:25',departure:'--',distance:1384,day:2,platform:4,halt:true}
  ]},
  { number:'12954', name:'August Kranti Rajdhani', type:'rajdhani', from:'BCT', to:'NDLS', depart:'17:40', arrive:'11:25+1', duration:'17:45', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'1A':{fare:4635,seats:8},'2A':{fare:2770,seats:20},'3A':{fare:1930,seats:40}}, route:[
    {code:'BCT',name:'Mumbai Central',arrival:'--',departure:'17:40',distance:0,day:1,platform:1,halt:true},
    {code:'BPL',name:'Bhopal Junction',arrival:'01:45',departure:'01:50',distance:683,day:2,platform:2,halt:true},
    {code:'VGLJ',name:'V Lakshmibai Jhansi',arrival:'06:18',departure:'06:20',distance:1053,day:2,platform:3,halt:true},
    {code:'NDLS',name:'New Delhi',arrival:'11:25',departure:'--',distance:1384,day:2,platform:4,halt:true}
  ]},
  { number:'12431', name:'TVC Rajdhani Express', type:'rajdhani', from:'NDLS', to:'TVC', depart:'11:30', arrive:'15:10+2', duration:'27:40', days:['Wed','Sat'], classes:{'1A':{fare:5830,seats:8},'2A':{fare:3480,seats:20},'3A':{fare:2420,seats:40}}, route:[
    {code:'NDLS',name:'New Delhi',arrival:'--',departure:'11:30',distance:0,day:1,platform:1,halt:true},
    {code:'BPL',name:'Bhopal Junction',arrival:'19:35',departure:'19:40',distance:701,day:1,platform:2,halt:true},
    {code:'SC',name:'Secunderabad Junction',arrival:'05:50',departure:'05:55',distance:1680,day:2,platform:3,halt:true},
    {code:'ERS',name:'Ernakulam Junction',arrival:'13:05',departure:'13:10',distance:2542,day:2,platform:2,halt:true},
    {code:'TVC',name:'Thiruvananthapuram Central',arrival:'15:10',departure:'--',distance:2720,day:2,platform:4,halt:true}
  ]},
  { number:'12432', name:'TVC Rajdhani Express', type:'rajdhani', from:'TVC', to:'NDLS', depart:'21:20', arrive:'05:10+2', duration:'31:50', days:['Tue','Fri'], classes:{'1A':{fare:5830,seats:8},'2A':{fare:3480,seats:20},'3A':{fare:2420,seats:40}}, route:[
    {code:'TVC',name:'Thiruvananthapuram Central',arrival:'--',departure:'21:20',distance:0,day:1,platform:1,halt:true},
    {code:'ERS',name:'Ernakulam Junction',arrival:'23:45',departure:'23:50',distance:178,day:1,platform:2,halt:true},
    {code:'SC',name:'Secunderabad Junction',arrival:'09:30',departure:'09:35',distance:1040,day:2,platform:3,halt:true},
    {code:'BPL',name:'Bhopal Junction',arrival:'19:40',departure:'19:45',distance:2019,day:2,platform:2,halt:true},
    {code:'NDLS',name:'New Delhi',arrival:'05:10',departure:'--',distance:2720,day:2,platform:4,halt:true}
  ]},
  { number:'12957', name:'Swarna Jayanti Rajdhani', type:'rajdhani', from:'NDLS', to:'ADI', depart:'19:20', arrive:'08:50+1', duration:'13:30', days:['Mon','Wed','Sat'], classes:{'1A':{fare:4200,seats:8},'2A':{fare:2510,seats:20},'3A':{fare:1750,seats:40}}, route:[
    {code:'NDLS',name:'New Delhi',arrival:'--',departure:'19:20',distance:0,day:1,platform:1,halt:true},
    {code:'JP',name:'Jaipur Junction',arrival:'23:45',departure:'23:50',distance:308,day:1,platform:2,halt:true},
    {code:'AII',name:'Ajmer Junction',arrival:'02:15',departure:'02:17',distance:453,day:2,platform:3,halt:true},
    {code:'ADI',name:'Ahmedabad Junction',arrival:'08:50',departure:'--',distance:933,day:2,platform:4,halt:true}
  ]},
  { number:'12958', name:'Swarna Jayanti Rajdhani', type:'rajdhani', from:'ADI', to:'NDLS', depart:'16:10', arrive:'05:55+1', duration:'13:45', days:['Tue','Fri','Sun'], classes:{'1A':{fare:4200,seats:8},'2A':{fare:2510,seats:20},'3A':{fare:1750,seats:40}}, route:[
    {code:'ADI',name:'Ahmedabad Junction',arrival:'--',departure:'16:10',distance:0,day:1,platform:1,halt:true},
    {code:'AII',name:'Ajmer Junction',arrival:'21:55',departure:'21:57',distance:480,day:1,platform:2,halt:true},
    {code:'JP',name:'Jaipur Junction',arrival:'00:20',departure:'00:25',distance:625,day:2,platform:3,halt:true},
    {code:'NDLS',name:'New Delhi',arrival:'05:55',departure:'--',distance:933,day:2,platform:4,halt:true}
  ]},
  { number:'12425', name:'NDLS-JAT Rajdhani', type:'rajdhani', from:'NDLS', to:'JAT', depart:'20:40', arrive:'05:45+1', duration:'09:05', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'1A':{fare:3240,seats:8},'2A':{fare:1930,seats:20},'3A':{fare:1350,seats:40}}, route:[
    {code:'NDLS',name:'New Delhi',arrival:'--',departure:'20:40',distance:0,day:1,platform:1,halt:true},
    {code:'MB',name:'Moradabad Junction',arrival:'03:10',departure:'03:12',distance:686,day:2,platform:2,halt:true},
    {code:'LKO',name:'Lucknow NR',arrival:'00:25',departure:'00:30',distance:493,day:2,platform:3,halt:true},
    {code:'JAT',name:'Jammu Tawi',arrival:'05:45',departure:'--',distance:812,day:2,platform:4,halt:true}
  ]},
  { number:'12426', name:'JAT-NDLS Rajdhani', type:'rajdhani', from:'JAT', to:'NDLS', depart:'19:45', arrive:'05:00+1', duration:'09:15', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'1A':{fare:3240,seats:8},'2A':{fare:1930,seats:20},'3A':{fare:1350,seats:40}}, route:[
    {code:'JAT',name:'Jammu Tawi',arrival:'--',departure:'19:45',distance:0,day:1,platform:1,halt:true},
    {code:'MB',name:'Moradabad Junction',arrival:'01:55',departure:'01:57',distance:126,day:2,platform:2,halt:true},
    {code:'LKO',name:'Lucknow NR',arrival:'04:35',departure:'04:40',distance:319,day:2,platform:3,halt:true},
    {code:'NDLS',name:'New Delhi',arrival:'05:00',departure:'--',distance:812,day:2,platform:4,halt:true}
  ]},
  { number:'12985', name:'DDN Rajdhani Express', type:'rajdhani', from:'NDLS', to:'DDN', depart:'23:30', arrive:'05:40+1', duration:'06:10', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'1A':{fare:2680,seats:8},'2A':{fare:1600,seats:20},'3A':{fare:1120,seats:40}}, route:[
    {code:'NDLS',name:'New Delhi',arrival:'--',departure:'23:30',distance:0,day:1,platform:1,halt:true},
    {code:'AGC',name:'Agra Cantt',arrival:'02:05',departure:'02:07',distance:189,day:2,platform:2,halt:true},
    {code:'DDN',name:'Dehradun',arrival:'05:40',departure:'--',distance:248,day:2,platform:4,halt:true}
  ]},
  { number:'22435', name:'Vande Bharat (NDLS-BSB)', type:'vande_bharat', from:'NDLS', to:'BSB', depart:'06:00', arrive:'14:00', duration:'08:00', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'CC':{fare:1885,seats:56},'EC':{fare:3520,seats:52}}, route:[
    {code:'NDLS',name:'New Delhi',arrival:'--',departure:'06:00',distance:0,day:1,platform:1,halt:true},
    {code:'PRYJ',name:'Prayagraj Junction',arrival:'10:45',departure:'10:47',distance:635,day:1,platform:2,halt:true},
    {code:'BSB',name:'Banaras',arrival:'14:00',departure:'--',distance:820,day:1,platform:3,halt:true}
  ]},
  { number:'22436', name:'Vande Bharat (BSB-NDLS)', type:'vande_bharat', from:'BSB', to:'NDLS', depart:'15:00', arrive:'23:00', duration:'08:00', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'CC':{fare:1885,seats:56},'EC':{fare:3520,seats:52}}, route:[
    {code:'BSB',name:'Banaras',arrival:'--',departure:'15:00',distance:0,day:1,platform:1,halt:true},
    {code:'PRYJ',name:'Prayagraj Junction',arrival:'17:55',departure:'17:57',distance:185,day:1,platform:2,halt:true},
    {code:'NDLS',name:'New Delhi',arrival:'23:00',departure:'--',distance:820,day:1,platform:3,halt:true}
  ]},
  { number:'22439', name:'Vande Bharat (NDLS-SVDK)', type:'vande_bharat', from:'NDLS', to:'SVDK', depart:'06:00', arrive:'14:00', duration:'08:00', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'CC':{fare:1680,seats:56},'EC':{fare:3135,seats:52}}, route:[
    {code:'NDLS',name:'New Delhi',arrival:'--',departure:'06:00',distance:0,day:1,platform:1,halt:true},
    {code:'UMB',name:'Ambala Cantt',arrival:'09:15',departure:'09:17',distance:231,day:1,platform:2,halt:true},
    {code:'SVDK',name:'SMVD Katra',arrival:'14:00',departure:'--',distance:655,day:1,platform:4,halt:true}
  ]},
  { number:'22440', name:'Vande Bharat (SVDK-NDLS)', type:'vande_bharat', from:'SVDK', to:'NDLS', depart:'15:00', arrive:'23:00', duration:'08:00', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'CC':{fare:1680,seats:56},'EC':{fare:3135,seats:52}}, route:[
    {code:'SVDK',name:'SMVD Katra',arrival:'--',departure:'15:00',distance:0,day:1,platform:1,halt:true},
    {code:'UMB',name:'Ambala Cantt',arrival:'19:45',departure:'19:47',distance:424,day:1,platform:3,halt:true},
    {code:'NDLS',name:'New Delhi',arrival:'23:00',departure:'--',distance:655,day:1,platform:4,halt:true}
  ]},
  { number:'22441', name:'Vande Bharat (MAS-MYS)', type:'vande_bharat', from:'MAS', to:'MYS', depart:'06:00', arrive:'14:00', duration:'08:00', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'CC':{fare:1550,seats:56},'EC':{fare:2880,seats:52}}, route:[
    {code:'MAS',name:'Chennai Central',arrival:'--',departure:'06:00',distance:0,day:1,platform:1,halt:true},
    {code:'SA',name:'Salem Junction',arrival:'09:15',departure:'09:17',distance:345,day:1,platform:2,halt:true},
    {code:'MYS',name:'Mysuru Junction',arrival:'14:00',departure:'--',distance:750,day:1,platform:4,halt:true}
  ]},
  { number:'22442', name:'Vande Bharat (MYS-MAS)', type:'vande_bharat', from:'MYS', to:'MAS', depart:'15:00', arrive:'23:00', duration:'08:00', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'CC':{fare:1550,seats:56},'EC':{fare:2880,seats:52}}, route:[
    {code:'MYS',name:'Mysuru Junction',arrival:'--',departure:'15:00',distance:0,day:1,platform:1,halt:true},
    {code:'SA',name:'Salem Junction',arrival:'19:45',departure:'19:47',distance:405,day:1,platform:3,halt:true},
    {code:'MAS',name:'Chennai Central',arrival:'23:00',departure:'--',distance:750,day:1,platform:4,halt:true}
  ]},
  { number:'22443', name:'Vande Bharat (HWH-NJP)', type:'vande_bharat', from:'HWH', to:'NJP', depart:'05:55', arrive:'13:10', duration:'07:15', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'CC':{fare:1350,seats:56},'EC':{fare:2510,seats:52}}, route:[
    {code:'HWH',name:'Howrah Junction',arrival:'--',departure:'05:55',distance:0,day:1,platform:1,halt:true},
    {code:'MSP',name:'Malda Town',arrival:'09:40',departure:'09:42',distance:347,day:1,platform:2,halt:true},
    {code:'NJP',name:'New Jalpaiguri',arrival:'13:10',departure:'--',distance:570,day:1,platform:3,halt:true}
  ]},
  { number:'22444', name:'Vande Bharat (NJP-HWH)', type:'vande_bharat', from:'NJP', to:'HWH', depart:'14:10', arrive:'21:25', duration:'07:15', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'CC':{fare:1350,seats:56},'EC':{fare:2510,seats:52}}, route:[
    {code:'NJP',name:'New Jalpaiguri',arrival:'--',departure:'14:10',distance:0,day:1,platform:1,halt:true},
    {code:'MSP',name:'Malda Town',arrival:'17:35',departure:'17:37',distance:223,day:1,platform:2,halt:true},
    {code:'HWH',name:'Howrah Junction',arrival:'21:25',departure:'--',distance:570,day:1,platform:3,halt:true}
  ]},
  { number:'22447', name:'Vande Bharat (BCT-ADI)', type:'vande_bharat', from:'BCT', to:'ADI', depart:'06:00', arrive:'12:30', duration:'06:30', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'CC':{fare:1390,seats:56},'EC':{fare:2590,seats:52}}, route:[
    {code:'BCT',name:'Mumbai Central',arrival:'--',departure:'06:00',distance:0,day:1,platform:1,halt:true},
    {code:'BRC',name:'Vadodara Junction',arrival:'09:30',departure:'09:32',distance:391,day:1,platform:2,halt:true},
    {code:'ADI',name:'Ahmedabad Junction',arrival:'12:30',departure:'--',distance:534,day:1,platform:3,halt:true}
  ]},
  { number:'22448', name:'Vande Bharat (ADI-BCT)', type:'vande_bharat', from:'ADI', to:'BCT', depart:'14:30', arrive:'21:00', duration:'06:30', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'CC':{fare:1390,seats:56},'EC':{fare:2590,seats:52}}, route:[
    {code:'ADI',name:'Ahmedabad Junction',arrival:'--',departure:'14:30',distance:0,day:1,platform:1,halt:true},
    {code:'BRC',name:'Vadodara Junction',arrival:'17:30',departure:'17:32',distance:143,day:1,platform:2,halt:true},
    {code:'BCT',name:'Mumbai Central',arrival:'21:00',departure:'--',distance:534,day:1,platform:3,halt:true}
  ]},
  { number:'22449', name:'Vande Bharat (HWH-PURI)', type:'vande_bharat', from:'HWH', to:'PURI', depart:'06:00', arrive:'14:00', duration:'08:00', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'CC':{fare:1350,seats:56},'EC':{fare:2510,seats:52}}, route:[
    {code:'HWH',name:'Howrah Junction',arrival:'--',departure:'06:00',distance:0,day:1,platform:1,halt:true},
    {code:'BBS',name:'Bhubaneswar',arrival:'10:45',departure:'10:47',distance:463,day:1,platform:2,halt:true},
    {code:'PURI',name:'Puri',arrival:'14:00',departure:'--',distance:520,day:1,platform:3,halt:true}
  ]},
  { number:'22450', name:'Vande Bharat (PURI-HWH)', type:'vande_bharat', from:'PURI', to:'HWH', depart:'15:00', arrive:'23:00', duration:'08:00', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'CC':{fare:1350,seats:56},'EC':{fare:2510,seats:52}}, route:[
    {code:'PURI',name:'Puri',arrival:'--',departure:'15:00',distance:0,day:1,platform:1,halt:true},
    {code:'BBS',name:'Bhubaneswar',arrival:'17:45',departure:'17:47',distance:57,day:1,platform:2,halt:true},
    {code:'HWH',name:'Howrah Junction',arrival:'23:00',departure:'--',distance:520,day:1,platform:3,halt:true}
  ]},
  { number:'22451', name:'Vande Bharat (MAS-CBE)', type:'vande_bharat', from:'MAS', to:'CBE', depart:'06:00', arrive:'14:00', duration:'08:00', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'CC':{fare:1350,seats:56},'EC':{fare:2510,seats:52}}, route:[
    {code:'MAS',name:'Chennai Central',arrival:'--',departure:'06:00',distance:0,day:1,platform:1,halt:true},
    {code:'SA',name:'Salem Junction',arrival:'09:30',departure:'09:32',distance:345,day:1,platform:2,halt:true},
    {code:'CBE',name:'Coimbatore Junction',arrival:'14:00',departure:'--',distance:510,day:1,platform:3,halt:true}
  ]},
  { number:'22452', name:'Vande Bharat (CBE-MAS)', type:'vande_bharat', from:'CBE', to:'MAS', depart:'15:00', arrive:'23:00', duration:'08:00', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'CC':{fare:1350,seats:56},'EC':{fare:2510,seats:52}}, route:[
    {code:'CBE',name:'Coimbatore Junction',arrival:'--',departure:'15:00',distance:0,day:1,platform:1,halt:true},
    {code:'SA',name:'Salem Junction',arrival:'17:30',departure:'17:32',distance:165,day:1,platform:2,halt:true},
    {code:'MAS',name:'Chennai Central',arrival:'23:00',departure:'--',distance:510,day:1,platform:3,halt:true}
  ]},
  { number:'12002', name:'Bhopal Shatabdi', type:'shatabdi', from:'NDLS', to:'HBJ', depart:'06:00', arrive:'14:10', duration:'08:10', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'CC':{fare:1355,seats:56},'EC':{fare:2550,seats:52}}, route:[
    {code:'NDLS',name:'New Delhi',arrival:'--',departure:'06:00',distance:0,day:1,platform:1,halt:true},
    {code:'AGC',name:'Agra Cantt',arrival:'08:05',departure:'08:07',distance:189,day:1,platform:2,halt:true},
    {code:'JHS',name:'Jhansi Junction',arrival:'10:30',departure:'10:32',distance:403,day:1,platform:3,halt:true},
    {code:'HBJ',name:'Habibganj',arrival:'14:10',departure:'--',distance:701,day:1,platform:4,halt:true}
  ]},
  { number:'12001', name:'Bhopal Shatabdi', type:'shatabdi', from:'HBJ', to:'NDLS', depart:'14:40', arrive:'22:50', duration:'08:10', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'CC':{fare:1355,seats:56},'EC':{fare:2550,seats:52}}, route:[
    {code:'HBJ',name:'Habibganj',arrival:'--',departure:'14:40',distance:0,day:1,platform:1,halt:true},
    {code:'JHS',name:'Jhansi Junction',arrival:'18:10',departure:'18:12',distance:298,day:1,platform:2,halt:true},
    {code:'NDLS',name:'New Delhi',arrival:'22:50',departure:'--',distance:701,day:1,platform:4,halt:true}
  ]},
  { number:'12011', name:'Chandigarh Shatabdi', type:'shatabdi', from:'NDLS', to:'CDG', depart:'07:40', arrive:'11:15', duration:'03:35', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'CC':{fare:785,seats:56},'EC':{fare:1470,seats:52}}, route:[
    {code:'NDLS',name:'New Delhi',arrival:'--',departure:'07:40',distance:0,day:1,platform:1,halt:true},
    {code:'UMB',name:'Ambala Cantt',arrival:'10:10',departure:'10:12',distance:231,day:1,platform:2,halt:true},
    {code:'CDG',name:'Chandigarh',arrival:'11:15',departure:'--',distance:265,day:1,platform:3,halt:true}
  ]},
  { number:'12012', name:'Chandigarh Shatabdi', type:'shatabdi', from:'CDG', to:'NDLS', depart:'16:40', arrive:'20:15', duration:'03:35', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'CC':{fare:785,seats:56},'EC':{fare:1470,seats:52}}, route:[
    {code:'CDG',name:'Chandigarh',arrival:'--',departure:'16:40',distance:0,day:1,platform:1,halt:true},
    {code:'UMB',name:'Ambala Cantt',arrival:'17:38',departure:'17:40',distance:34,day:1,platform:2,halt:true},
    {code:'NDLS',name:'New Delhi',arrival:'20:15',departure:'--',distance:265,day:1,platform:3,halt:true}
  ]},
  { number:'12013', name:'Amritsar Shatabdi', type:'shatabdi', from:'NDLS', to:'ASR', depart:'07:10', arrive:'13:30', duration:'06:20', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'CC':{fare:1205,seats:56},'EC':{fare:2250,seats:52}}, route:[
    {code:'NDLS',name:'New Delhi',arrival:'--',departure:'07:10',distance:0,day:1,platform:1,halt:true},
    {code:'UMB',name:'Ambala Cantt',arrival:'09:40',departure:'09:42',distance:231,day:1,platform:2,halt:true},
    {code:'LDH',name:'Ludhiana Junction',arrival:'11:15',departure:'11:17',distance:359,day:1,platform:3,halt:true},
    {code:'ASR',name:'Amritsar Junction',arrival:'13:30',departure:'--',distance:449,day:1,platform:4,halt:true}
  ]},
  { number:'12014', name:'Amritsar Shatabdi', type:'shatabdi', from:'ASR', to:'NDLS', depart:'16:55', arrive:'23:15', duration:'06:20', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'CC':{fare:1205,seats:56},'EC':{fare:2250,seats:52}}, route:[
    {code:'ASR',name:'Amritsar Junction',arrival:'--',departure:'16:55',distance:0,day:1,platform:1,halt:true},
    {code:'LDH',name:'Ludhiana Junction',arrival:'19:00',departure:'19:02',distance:90,day:1,platform:2,halt:true},
    {code:'NDLS',name:'New Delhi',arrival:'23:15',departure:'--',distance:449,day:1,platform:4,halt:true}
  ]},
  { number:'12025', name:'Pune-Secunderabad Shatabdi', type:'shatabdi', from:'PUNE', to:'SC', depart:'06:10', arrive:'14:10', duration:'08:00', days:['Mon','Fri'], classes:{'CC':{fare:1300,seats:56},'EC':{fare:2430,seats:52}}, route:[
    {code:'PUNE',name:'Pune Junction',arrival:'--',departure:'06:10',distance:0,day:1,platform:1,halt:true},
    {code:'SUR',name:'Solapur Junction',arrival:'09:30',departure:'09:32',distance:262,day:1,platform:2,halt:true},
    {code:'SC',name:'Secunderabad Junction',arrival:'14:10',departure:'--',distance:542,day:1,platform:4,halt:true}
  ]},
  { number:'12049', name:'Gatimaan Express', type:'gatimaan', from:'NDLS', to:'AGC', depart:'08:10', arrive:'09:50', duration:'01:40', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'CC':{fare:690,seats:56},'EC':{fare:1370,seats:52}}, route:[
    {code:'NDLS',name:'New Delhi',arrival:'--',departure:'08:10',distance:0,day:1,platform:1,halt:true},
    {code:'MTJ',name:'Mathura Junction',arrival:'09:15',departure:'09:17',distance:142,day:1,platform:2,halt:true},
    {code:'AGC',name:'Agra Cantt',arrival:'09:50',departure:'--',distance:189,day:1,platform:3,halt:true}
  ]},
  { number:'12050', name:'Gatimaan Express', type:'gatimaan', from:'AGC', to:'NDLS', depart:'17:50', arrive:'19:30', duration:'01:40', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'CC':{fare:690,seats:56},'EC':{fare:1370,seats:52}}, route:[
    {code:'AGC',name:'Agra Cantt',arrival:'--',departure:'17:50',distance:0,day:1,platform:1,halt:true},
    {code:'MTJ',name:'Mathura Junction',arrival:'18:15',departure:'18:17',distance:47,day:1,platform:2,halt:true},
    {code:'NDLS',name:'New Delhi',arrival:'19:30',departure:'--',distance:189,day:1,platform:3,halt:true}
  ]},
  { number:'12267', name:'Mumbai Duronto Express', type:'duronto', from:'BCT', to:'NDLS', depart:'23:35', arrive:'15:40+1', duration:'16:05', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'1A':{fare:4635,seats:8},'2A':{fare:2770,seats:20},'3A':{fare:1930,seats:40}}, route:[
    {code:'BCT',name:'Mumbai Central',arrival:'--',departure:'23:35',distance:0,day:1,platform:1,halt:true},
    {code:'BPL',name:'Bhopal Junction',arrival:'07:50',departure:'07:55',distance:683,day:2,platform:2,halt:true},
    {code:'NDLS',name:'New Delhi',arrival:'15:40',departure:'--',distance:1384,day:2,platform:3,halt:true}
  ]},
  { number:'12268', name:'Mumbai Duronto Express', type:'duronto', from:'NDLS', to:'BCT', depart:'23:40', arrive:'15:45+1', duration:'16:05', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'1A':{fare:4635,seats:8},'2A':{fare:2770,seats:20},'3A':{fare:1930,seats:40}}, route:[
    {code:'NDLS',name:'New Delhi',arrival:'--',departure:'23:40',distance:0,day:1,platform:1,halt:true},
    {code:'BPL',name:'Bhopal Junction',arrival:'07:40',departure:'07:45',distance:701,day:2,platform:2,halt:true},
    {code:'BCT',name:'Mumbai Central',arrival:'15:45',departure:'--',distance:1384,day:2,platform:3,halt:true}
  ]},
  { number:'12259', name:'Sealdah Duronto Express', type:'duronto', from:'SDAH', to:'NDLS', depart:'20:05', arrive:'10:10+1', duration:'14:05', days:['Mon','Wed','Fri'], classes:{'1A':{fare:4450,seats:8},'2A':{fare:2660,seats:20},'3A':{fare:1855,seats:40}}, route:[
    {code:'SDAH',name:'Sealdah',arrival:'--',departure:'20:05',distance:0,day:1,platform:1,halt:true},
    {code:'GAYA',name:'Gaya Junction',arrival:'04:38',departure:'04:40',distance:837,day:2,platform:3,halt:true},
    {code:'NDLS',name:'New Delhi',arrival:'10:10',departure:'--',distance:1457,day:2,platform:4,halt:true}
  ]},
  { number:'12260', name:'Sealdah Duronto Express', type:'duronto', from:'NDLS', to:'SDAH', depart:'20:15', arrive:'10:20+1', duration:'14:05', days:['Tue','Thu','Sat'], classes:{'1A':{fare:4450,seats:8},'2A':{fare:2660,seats:20},'3A':{fare:1855,seats:40}}, route:[
    {code:'NDLS',name:'New Delhi',arrival:'--',departure:'20:15',distance:0,day:1,platform:1,halt:true},
    {code:'GAYA',name:'Gaya Junction',arrival:'03:38',departure:'03:40',distance:620,day:2,platform:2,halt:true},
    {code:'SDAH',name:'Sealdah',arrival:'10:20',departure:'--',distance:1457,day:2,platform:4,halt:true}
  ]},
  { number:'12273', name:'Howrah Duronto Express', type:'duronto', from:'HWH', to:'NDLS', depart:'23:50', arrive:'17:45+1', duration:'17:55', days:['Mon','Wed','Sat'], classes:{'1A':{fare:4890,seats:8},'2A':{fare:2925,seats:20},'3A':{fare:2040,seats:40}}, route:[
    {code:'HWH',name:'Howrah Junction',arrival:'--',departure:'23:50',distance:0,day:1,platform:1,halt:true},
    {code:'GAYA',name:'Gaya Junction',arrival:'08:38',departure:'08:40',distance:668,day:2,platform:3,halt:true},
    {code:'NDLS',name:'New Delhi',arrival:'17:45',departure:'--',distance:1447,day:2,platform:4,halt:true}
  ]},
  { number:'12274', name:'Howrah Duronto Express', type:'duronto', from:'NDLS', to:'HWH', depart:'23:50', arrive:'17:45+1', duration:'17:55', days:['Tue','Thu','Sun'], classes:{'1A':{fare:4890,seats:8},'2A':{fare:2925,seats:20},'3A':{fare:2040,seats:40}}, route:[
    {code:'NDLS',name:'New Delhi',arrival:'--',departure:'23:50',distance:0,day:1,platform:1,halt:true},
    {code:'GAYA',name:'Gaya Junction',arrival:'07:18',departure:'07:20',distance:779,day:2,platform:2,halt:true},
    {code:'HWH',name:'Howrah Junction',arrival:'17:45',departure:'--',distance:1447,day:2,platform:4,halt:true}
  ]},
  { number:'12261', name:'Chennai Duronto Express', type:'duronto', from:'MAS', to:'NDLS', depart:'22:30', arrive:'12:30+1', duration:'14:00', days:['Mon','Fri'], classes:{'1A':{fare:4450,seats:8},'2A':{fare:2660,seats:20},'3A':{fare:1855,seats:40}}, route:[
    {code:'MAS',name:'Chennai Central',arrival:'--',departure:'22:30',distance:0,day:1,platform:1,halt:true},
    {code:'SC',name:'Secunderabad Junction',arrival:'04:45',departure:'04:50',distance:500,day:2,platform:2,halt:true},
    {code:'NDLS',name:'New Delhi',arrival:'12:30',departure:'--',distance:2180,day:2,platform:4,halt:true}
  ]},
  { number:'12262', name:'Chennai Duronto Express', type:'duronto', from:'NDLS', to:'MAS', depart:'10:30', arrive:'00:30+2', duration:'14:00', days:['Wed','Sat'], classes:{'1A':{fare:4450,seats:8},'2A':{fare:2660,seats:20},'3A':{fare:1855,seats:40}}, route:[
    {code:'NDLS',name:'New Delhi',arrival:'--',departure:'10:30',distance:0,day:1,platform:1,halt:true},
    {code:'SC',name:'Secunderabad Junction',arrival:'18:25',departure:'18:30',distance:1680,day:1,platform:3,halt:true},
    {code:'MAS',name:'Chennai Central',arrival:'00:30',departure:'--',distance:2180,day:2,platform:4,halt:true}
  ]},
  { number:'82901', name:'Mumbai-Ahmedabad Tejas Express', type:'tejas', from:'BCT', to:'ADI', depart:'06:40', arrive:'13:10', duration:'06:30', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'CC':{fare:1615,seats:56},'EC':{fare:3030,seats:52}}, route:[
    {code:'BCT',name:'Mumbai Central',arrival:'--',departure:'06:40',distance:0,day:1,platform:1,halt:true},
    {code:'BRC',name:'Vadodara Junction',arrival:'10:10',departure:'10:12',distance:391,day:1,platform:2,halt:true},
    {code:'ADI',name:'Ahmedabad Junction',arrival:'13:10',departure:'--',distance:534,day:1,platform:3,halt:true}
  ]},
  { number:'82902', name:'Ahmedabad-Mumbai Tejas Express', type:'tejas', from:'ADI', to:'BCT', depart:'15:10', arrive:'21:40', duration:'06:30', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'CC':{fare:1615,seats:56},'EC':{fare:3030,seats:52}}, route:[
    {code:'ADI',name:'Ahmedabad Junction',arrival:'--',departure:'15:10',distance:0,day:1,platform:1,halt:true},
    {code:'BRC',name:'Vadodara Junction',arrival:'18:00',departure:'18:02',distance:143,day:1,platform:2,halt:true},
    {code:'BCT',name:'Mumbai Central',arrival:'21:40',departure:'--',distance:534,day:1,platform:3,halt:true}
  ]},
  { number:'82907', name:'Mumbai-Goa Tejas Express', type:'tejas', from:'LTT', to:'MAO', depart:'05:50', arrive:'13:10', duration:'07:20', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'CC':{fare:1250,seats:56},'EC':{fare:2330,seats:52}}, route:[
    {code:'LTT',name:'Lokmanya Tilak Terminus',arrival:'--',departure:'05:50',distance:0,day:1,platform:1,halt:true},
    {code:'RN',name:'Ratnagiri',arrival:'10:15',departure:'10:17',distance:335,day:1,platform:2,halt:true},
    {code:'MAO',name:'Madgaon Junction',arrival:'13:10',departure:'--',distance:588,day:1,platform:3,halt:true}
  ]},
  { number:'82908', name:'Goa-Mumbai Tejas Express', type:'tejas', from:'MAO', to:'LTT', depart:'14:10', arrive:'21:30', duration:'07:20', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'CC':{fare:1250,seats:56},'EC':{fare:2330,seats:52}}, route:[
    {code:'MAO',name:'Madgaon Junction',arrival:'--',departure:'14:10',distance:0,day:1,platform:1,halt:true},
    {code:'RN',name:'Ratnagiri',arrival:'17:05',departure:'17:07',distance:253,day:1,platform:2,halt:true},
    {code:'LTT',name:'Lokmanya Tilak Terminus',arrival:'21:30',departure:'--',distance:588,day:1,platform:3,halt:true}
  ]},
  { number:'12625', name:'Kerala Express', type:'superfast', from:'NDLS', to:'TVC', depart:'22:50', arrive:'11:40+2', duration:'36:50', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'1A':{fare:5640,seats:8},'2A':{fare:3315,seats:20},'3A':{fare:2290,seats:40},'SL':{fare:610,seats:100}}, route:[
    {code:'NDLS',name:'New Delhi',arrival:'--',departure:'22:50',distance:0,day:1,platform:1,halt:true},
    {code:'JHS',name:'Jhansi Junction',arrival:'03:10',departure:'03:12',distance:331,day:2,platform:2,halt:true},
    {code:'SC',name:'Secunderabad Junction',arrival:'15:20',departure:'15:25',distance:1297,day:2,platform:3,halt:true},
    {code:'TVC',name:'Thiruvananthapuram Central',arrival:'11:40',departure:'--',distance:2293,day:3,platform:4,halt:true}
  ]},
  { number:'12626', name:'Kerala Express', type:'superfast', from:'TVC', to:'NDLS', depart:'11:15', arrive:'23:55+2', duration:'36:40', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'1A':{fare:5640,seats:8},'2A':{fare:3315,seats:20},'3A':{fare:2290,seats:40},'SL':{fare:610,seats:100}}, route:[
    {code:'TVC',name:'Thiruvananthapuram Central',arrival:'--',departure:'11:15',distance:0,day:1,platform:1,halt:true},
    {code:'SC',name:'Secunderabad Junction',arrival:'06:35',departure:'06:40',distance:996,day:2,platform:3,halt:true},
    {code:'NDLS',name:'New Delhi',arrival:'23:55',departure:'--',distance:2293,day:2,platform:4,halt:true}
  ]},
  { number:'12611', name:'Grand Trunk Express', type:'superfast', from:'MAS', to:'NDLS', depart:'22:00', arrive:'11:30+2', duration:'37:30', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'1A':{fare:5380,seats:8},'2A':{fare:3155,seats:20},'3A':{fare:2185,seats:40},'SL':{fare:585,seats:100}}, route:[
    {code:'MAS',name:'Chennai Central',arrival:'--',departure:'22:00',distance:0,day:1,platform:1,halt:true},
    {code:'NAG',name:'Nagpur Junction',arrival:'13:40',departure:'13:45',distance:1106,day:2,platform:3,halt:true},
    {code:'NDLS',name:'New Delhi',arrival:'11:30',departure:'--',distance:2180,day:2,platform:4,halt:true}
  ]},
  { number:'12612', name:'Grand Trunk Express', type:'superfast', from:'NDLS', to:'MAS', depart:'15:50', arrive:'05:15+2', duration:'37:25', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'1A':{fare:5380,seats:8},'2A':{fare:3155,seats:20},'3A':{fare:2185,seats:40},'SL':{fare:585,seats:100}}, route:[
    {code:'NDLS',name:'New Delhi',arrival:'--',departure:'15:50',distance:0,day:1,platform:1,halt:true},
    {code:'NAG',name:'Nagpur Junction',arrival:'04:20',departure:'04:25',distance:1074,day:2,platform:3,halt:true},
    {code:'MAS',name:'Chennai Central',arrival:'05:15',departure:'--',distance:2180,day:2,platform:4,halt:true}
  ]},
  { number:'12723', name:'Telangana Express', type:'superfast', from:'SC', to:'NDLS', depart:'20:25', arrive:'10:55+1', duration:'14:30', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'1A':{fare:4210,seats:8},'2A':{fare:2490,seats:20},'3A':{fare:1735,seats:40},'SL':{fare:465,seats:100}}, route:[
    {code:'SC',name:'Secunderabad Junction',arrival:'--',departure:'20:25',distance:0,day:1,platform:1,halt:true},
    {code:'KZJ',name:'Kazipet Junction',arrival:'22:25',departure:'22:27',distance:125,day:1,platform:2,halt:true},
    {code:'NGP',name:'Nagpur Junction',arrival:'04:55',departure:'05:00',distance:507,day:2,platform:3,halt:true},
    {code:'NDLS',name:'New Delhi',arrival:'10:55',departure:'--',distance:1660,day:2,platform:4,halt:true}
  ]},
  { number:'12724', name:'Telangana Express', type:'superfast', from:'NDLS', to:'SC', depart:'11:35', arrive:'01:55+1', duration:'14:20', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'1A':{fare:4210,seats:8},'2A':{fare:2490,seats:20},'3A':{fare:1735,seats:40},'SL':{fare:465,seats:100}}, route:[
    {code:'NDLS',name:'New Delhi',arrival:'--',departure:'11:35',distance:0,day:1,platform:1,halt:true},
    {code:'NGP',name:'Nagpur Junction',arrival:'00:00',departure:'00:05',distance:1153,day:2,platform:3,halt:true},
    {code:'KZJ',name:'Kazipet Junction',arrival:'06:15',departure:'06:17',distance:1535,day:2,platform:3,halt:true},
    {code:'SC',name:'Secunderabad Junction',arrival:'01:55',departure:'--',distance:1660,day:2,platform:4,halt:true}
  ]},
  { number:'12779', name:'Goa Express', type:'superfast', from:'NZM', to:'GOA', depart:'11:45', arrive:'11:30+1', duration:'23:45', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'1A':{fare:3690,seats:8},'2A':{fare:2180,seats:20},'3A':{fare:1520,seats:40},'SL':{fare:410,seats:100}}, route:[
    {code:'NZM',name:'Hazrat Nizamuddin',arrival:'--',departure:'11:45',distance:0,day:1,platform:1,halt:true},
    {code:'RTM',name:'Ratlam Junction',arrival:'21:55',departure:'21:57',distance:733,day:1,platform:2,halt:true},
    {code:'MAO',name:'Madgaon Junction',arrival:'08:30',departure:'08:35',distance:1555,day:2,platform:2,halt:true},
    {code:'GOA',name:'Vasco da Gama',arrival:'11:30',departure:'--',distance:1635,day:2,platform:4,halt:true}
  ]},
  { number:'12780', name:'Goa Express', type:'superfast', from:'GOA', to:'NZM', depart:'11:30', arrive:'11:15+1', duration:'23:45', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'1A':{fare:3690,seats:8},'2A':{fare:2180,seats:20},'3A':{fare:1520,seats:40},'SL':{fare:410,seats:100}}, route:[
    {code:'GOA',name:'Vasco da Gama',arrival:'--',departure:'11:30',distance:0,day:1,platform:1,halt:true},
    {code:'MAO',name:'Madgaon Junction',arrival:'12:10',departure:'12:15',distance:80,day:1,platform:2,halt:true},
    {code:'RTM',name:'Ratlam Junction',arrival:'23:50',departure:'23:52',distance:902,day:1,platform:2,halt:true},
    {code:'NZM',name:'Hazrat Nizamuddin',arrival:'11:15',departure:'--',distance:1635,day:2,platform:4,halt:true}
  ]},
  { number:'12903', name:'Golden Temple Mail', type:'superfast', from:'BCT', to:'ASR', depart:'18:10', arrive:'06:25+2', duration:'36:15', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'1A':{fare:4980,seats:8},'2A':{fare:2935,seats:20},'3A':{fare:2040,seats:40},'SL':{fare:545,seats:100}}, route:[
    {code:'BCT',name:'Mumbai Central',arrival:'--',departure:'18:10',distance:0,day:1,platform:1,halt:true},
    {code:'BRC',name:'Vadodara Junction',arrival:'22:30',departure:'22:32',distance:391,day:1,platform:2,halt:true},
    {code:'RTM',name:'Ratlam Junction',arrival:'02:35',departure:'02:37',distance:697,day:2,platform:3,halt:true},
    {code:'ASR',name:'Amritsar Junction',arrival:'06:25',departure:'--',distance:1551,day:3,platform:4,halt:true}
  ]},
  { number:'12904', name:'Golden Temple Mail', type:'superfast', from:'ASR', to:'BCT', depart:'17:40', arrive:'05:55+2', duration:'36:15', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'1A':{fare:4980,seats:8},'2A':{fare:2935,seats:20},'3A':{fare:2040,seats:40},'SL':{fare:545,seats:100}}, route:[
    {code:'ASR',name:'Amritsar Junction',arrival:'--',departure:'17:40',distance:0,day:1,platform:1,halt:true},
    {code:'LDH',name:'Ludhiana Junction',arrival:'19:55',departure:'19:57',distance:90,day:1,platform:2,halt:true},
    {code:'RTM',name:'Ratlam Junction',arrival:'07:35',departure:'07:37',distance:854,day:2,platform:2,halt:true},
    {code:'BCT',name:'Mumbai Central',arrival:'05:55',departure:'--',distance:1551,day:2,platform:4,halt:true}
  ]},
  { number:'12621', name:'Tamil Nadu Express', type:'superfast', from:'NDLS', to:'MAS', depart:'22:30', arrive:'11:45+2', duration:'37:15', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'1A':{fare:5380,seats:8},'2A':{fare:3155,seats:20},'3A':{fare:2185,seats:40},'SL':{fare:585,seats:100}}, route:[
    {code:'NDLS',name:'New Delhi',arrival:'--',departure:'22:30',distance:0,day:1,platform:1,halt:true},
    {code:'BPL',name:'Bhopal Junction',arrival:'07:35',departure:'07:40',distance:701,day:2,platform:3,halt:true},
    {code:'SC',name:'Secunderabad Junction',arrival:'17:50',departure:'17:55',distance:1680,day:2,platform:3,halt:true},
    {code:'MAS',name:'Chennai Central',arrival:'11:45',departure:'--',distance:2180,day:2,platform:4,halt:true}
  ]},
  { number:'12622', name:'Tamil Nadu Express', type:'superfast', from:'MAS', to:'NDLS', depart:'20:00', arrive:'09:15+2', duration:'37:15', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'1A':{fare:5380,seats:8},'2A':{fare:3155,seats:20},'3A':{fare:2185,seats:40},'SL':{fare:585,seats:100}}, route:[
    {code:'MAS',name:'Chennai Central',arrival:'--',departure:'20:00',distance:0,day:1,platform:1,halt:true},
    {code:'SC',name:'Secunderabad Junction',arrival:'02:15',departure:'02:20',distance:500,day:2,platform:2,halt:true},
    {code:'BPL',name:'Bhopal Junction',arrival:'12:30',departure:'12:35',distance:1479,day:2,platform:2,halt:true},
    {code:'NDLS',name:'New Delhi',arrival:'09:15',departure:'--',distance:2180,day:2,platform:4,halt:true}
  ]},
  { number:'12935', name:'Mumbai Superfast Express', type:'superfast', from:'BCT', to:'NDLS', depart:'23:35', arrive:'15:40+1', duration:'16:05', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'1A':{fare:4635,seats:8},'2A':{fare:2770,seats:20},'3A':{fare:1930,seats:40},'SL':{fare:515,seats:100}}, route:[
    {code:'BCT',name:'Mumbai Central',arrival:'--',departure:'23:35',distance:0,day:1,platform:1,halt:true},
    {code:'BPL',name:'Bhopal Junction',arrival:'07:50',departure:'07:55',distance:683,day:2,platform:2,halt:true},
    {code:'NDLS',name:'New Delhi',arrival:'15:40',departure:'--',distance:1384,day:2,platform:4,halt:true}
  ]},
  { number:'12936', name:'Delhi Superfast Express', type:'superfast', from:'NDLS', to:'BCT', depart:'23:40', arrive:'15:45+1', duration:'16:05', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'1A':{fare:4635,seats:8},'2A':{fare:2770,seats:20},'3A':{fare:1930,seats:40},'SL':{fare:515,seats:100}}, route:[
    {code:'NDLS',name:'New Delhi',arrival:'--',departure:'23:40',distance:0,day:1,platform:1,halt:true},
    {code:'BPL',name:'Bhopal Junction',arrival:'08:45',departure:'08:50',distance:701,day:2,platform:2,halt:true},
    {code:'BCT',name:'Mumbai Central',arrival:'15:45',departure:'--',distance:1384,day:2,platform:4,halt:true}
  ]},
  { number:'12655', name:'Navjeevan Express', type:'superfast', from:'MAS', to:'ADI', depart:'21:35', arrive:'05:55+2', duration:'32:20', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'1A':{fare:4890,seats:8},'2A':{fare:2885,seats:20},'3A':{fare:2005,seats:40},'SL':{fare:535,seats:100}}, route:[
    {code:'MAS',name:'Chennai Central',arrival:'--',departure:'21:35',distance:0,day:1,platform:1,halt:true},
    {code:'SC',name:'Secunderabad Junction',arrival:'03:50',departure:'03:55',distance:500,day:2,platform:2,halt:true},
    {code:'NAG',name:'Nagpur Junction',arrival:'10:25',departure:'10:30',distance:1019,day:2,platform:3,halt:true},
    {code:'ADI',name:'Ahmedabad Junction',arrival:'05:55',departure:'--',distance:1892,day:2,platform:4,halt:true}
  ]},
  { number:'12656', name:'Navjeevan Express', type:'superfast', from:'ADI', to:'MAS', depart:'09:40', arrive:'18:00+2', duration:'32:20', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'1A':{fare:4890,seats:8},'2A':{fare:2885,seats:20},'3A':{fare:2005,seats:40},'SL':{fare:535,seats:100}}, route:[
    {code:'ADI',name:'Ahmedabad Junction',arrival:'--',departure:'09:40',distance:0,day:1,platform:1,halt:true},
    {code:'NAG',name:'Nagpur Junction',arrival:'05:10',departure:'05:15',distance:873,day:2,platform:3,halt:true},
    {code:'SC',name:'Secunderabad Junction',arrival:'11:45',departure:'11:50',distance:1392,day:2,platform:2,halt:true},
    {code:'MAS',name:'Chennai Central',arrival:'18:00',departure:'--',distance:1892,day:2,platform:4,halt:true}
  ]},
  { number:'12802', name:'Purushottam Express', type:'superfast', from:'NDLS', to:'PURI', depart:'22:25', arrive:'07:15+2', duration:'32:50', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'1A':{fare:5210,seats:8},'2A':{fare:3060,seats:20},'3A':{fare:2125,seats:40},'SL':{fare:565,seats:100}}, route:[
    {code:'NDLS',name:'New Delhi',arrival:'--',departure:'22:25',distance:0,day:1,platform:1,halt:true},
    {code:'MGS',name:'Mughal Sarai',arrival:'07:35',departure:'07:37',distance:756,day:2,platform:3,halt:true},
    {code:'BBS',name:'Bhubaneswar',arrival:'03:55',departure:'03:57',distance:1712,day:3,platform:2,halt:true},
    {code:'PURI',name:'Puri',arrival:'07:15',departure:'--',distance:1757,day:3,platform:4,halt:true}
  ]},
  { number:'12801', name:'Purushottam Express', type:'superfast', from:'PURI', to:'NDLS', depart:'22:15', arrive:'07:05+2', duration:'32:50', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'1A':{fare:5210,seats:8},'2A':{fare:3060,seats:20},'3A':{fare:2125,seats:40},'SL':{fare:565,seats:100}}, route:[
    {code:'PURI',name:'Puri',arrival:'--',departure:'22:15',distance:0,day:1,platform:1,halt:true},
    {code:'BBS',name:'Bhubaneswar',arrival:'00:15',departure:'00:17',distance:45,day:2,platform:2,halt:true},
    {code:'MGS',name:'Mughal Sarai',arrival:'14:40',departure:'14:42',distance:1001,day:2,platform:3,halt:true},
    {code:'NDLS',name:'New Delhi',arrival:'07:05',departure:'--',distance:1757,day:3,platform:4,halt:true}
  ]},
  { number:'12269', name:'Tamil Nadu Duronto', type:'duronto', from:'MAS', to:'NDLS', depart:'22:30', arrive:'12:30+1', duration:'14:00', days:['Mon','Fri'], classes:{'1A':{fare:4450,seats:8},'2A':{fare:2660,seats:20},'3A':{fare:1855,seats:40}}, route:[
    {code:'MAS',name:'Chennai Central',arrival:'--',departure:'22:30',distance:0,day:1,platform:1,halt:true},
    {code:'NGP',name:'Nagpur Junction',arrival:'09:55',departure:'10:00',distance:1019,day:2,platform:3,halt:true},
    {code:'NDLS',name:'New Delhi',arrival:'12:30',departure:'--',distance:2180,day:2,platform:4,halt:true}
  ]},
  { number:'12369', name:'Kumbh Express', type:'superfast', from:'HWH', to:'NDLS', depart:'23:55', arrive:'17:55+1', duration:'18:00', days:['Wed','Sat'], classes:{'1A':{fare:4890,seats:8},'2A':{fare:2925,seats:20},'3A':{fare:2040,seats:40},'SL':{fare:545,seats:100}}, route:[
    {code:'HWH',name:'Howrah Junction',arrival:'--',departure:'23:55',distance:0,day:1,platform:1,halt:true},
    {code:'MSP',name:'Malda Town',arrival:'04:20',departure:'04:22',distance:347,day:2,platform:2,halt:true},
    {code:'GAYA',name:'Gaya Junction',arrival:'08:35',departure:'08:37',distance:668,day:2,platform:3,halt:true},
    {code:'NDLS',name:'New Delhi',arrival:'17:55',departure:'--',distance:1447,day:2,platform:4,halt:true}
  ]},
  { number:'12370', name:'Kumbh Express', type:'superfast', from:'NDLS', to:'HWH', depart:'23:55', arrive:'17:55+1', duration:'18:00', days:['Mon','Thu'], classes:{'1A':{fare:4890,seats:8},'2A':{fare:2925,seats:20},'3A':{fare:2040,seats:40},'SL':{fare:545,seats:100}}, route:[
    {code:'NDLS',name:'New Delhi',arrival:'--',departure:'23:55',distance:0,day:1,platform:1,halt:true},
    {code:'GAYA',name:'Gaya Junction',arrival:'08:38',departure:'08:40',distance:779,day:2,platform:2,halt:true},
    {code:'MSP',name:'Malda Town',arrival:'13:25',departure:'13:27',distance:1100,day:2,platform:3,halt:true},
    {code:'HWH',name:'Howrah Junction',arrival:'17:55',departure:'--',distance:1447,day:2,platform:4,halt:true}
  ]},
  { number:'12311', name:'Howrah Rajdhani via Patna', type:'rajdhani', from:'HWH', to:'NDLS', depart:'18:50', arrive:'10:00+1', duration:'15:10', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'1A':{fare:4890,seats:8},'2A':{fare:2925,seats:20},'3A':{fare:2040,seats:40}}, route:[
    {code:'HWH',name:'Howrah Junction',arrival:'--',departure:'18:50',distance:0,day:1,platform:1,halt:true},
    {code:'KIR',name:'Katihar Junction',arrival:'01:45',departure:'01:47',distance:531,day:2,platform:3,halt:true},
    {code:'PNBE',name:'Patna Junction',arrival:'06:05',departure:'06:10',distance:826,day:2,platform:2,halt:true},
    {code:'NDLS',name:'New Delhi',arrival:'10:00',departure:'--',distance:1447,day:2,platform:4,halt:true}
  ]},
  { number:'12986', name:'DDN-NDLS Rajdhani', type:'rajdhani', from:'DDN', to:'NDLS', depart:'23:20', arrive:'05:30+1', duration:'06:10', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'1A':{fare:2680,seats:8},'2A':{fare:1600,seats:20},'3A':{fare:1120,seats:40}}, route:[
    {code:'DDN',name:'Dehradun',arrival:'--',departure:'23:20',distance:0,day:1,platform:1,halt:true},
    {code:'AGC',name:'Agra Cantt',arrival:'02:50',departure:'02:52',distance:59,day:2,platform:2,halt:true},
    {code:'NDLS',name:'New Delhi',arrival:'05:30',departure:'--',distance:248,day:2,platform:4,halt:true}
  ]},
  { number:'12959', name:'NDLS-BCT Rajdhani via RTM', type:'rajdhani', from:'NDLS', to:'BCT', depart:'17:15', arrive:'10:35+1', duration:'17:20', days:['Tue','Thu','Sun'], classes:{'1A':{fare:4635,seats:8},'2A':{fare:2770,seats:20},'3A':{fare:1930,seats:40}}, route:[
    {code:'NDLS',name:'New Delhi',arrival:'--',departure:'17:15',distance:0,day:1,platform:1,halt:true},
    {code:'RTM',name:'Ratlam Junction',arrival:'01:35',departure:'01:37',distance:753,day:2,platform:2,halt:true},
    {code:'BCT',name:'Mumbai Central',arrival:'10:35',departure:'--',distance:1384,day:2,platform:4,halt:true}
  ]},
  { number:'12960', name:'BCT-NDLS Rajdhani via RTM', type:'rajdhani', from:'BCT', to:'NDLS', depart:'17:15', arrive:'10:35+1', duration:'17:20', days:['Mon','Wed','Fri'], classes:{'1A':{fare:4635,seats:8},'2A':{fare:2770,seats:20},'3A':{fare:1930,seats:40}}, route:[
    {code:'BCT',name:'Mumbai Central',arrival:'--',departure:'17:15',distance:0,day:1,platform:1,halt:true},
    {code:'RTM',name:'Ratlam Junction',arrival:'02:05',departure:'02:07',distance:631,day:2,platform:3,halt:true},
    {code:'NDLS',name:'New Delhi',arrival:'10:35',departure:'--',distance:1384,day:2,platform:4,halt:true}
  ]},
  { number:'12009', name:'Mumbai Shatabdi', type:'shatabdi', from:'BCT', to:'NDLS', depart:'06:00', arrive:'22:20', duration:'16:20', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'CC':{fare:2185,seats:56},'EC':{fare:4100,seats:52}}, route:[
    {code:'BCT',name:'Mumbai Central',arrival:'--',departure:'06:00',distance:0,day:1,platform:1,halt:true},
    {code:'BRC',name:'Vadodara Junction',arrival:'10:20',departure:'10:22',distance:391,day:1,platform:2,halt:true},
    {code:'RTM',name:'Ratlam Junction',arrival:'14:35',departure:'14:37',distance:697,day:1,platform:3,halt:true},
    {code:'NDLS',name:'New Delhi',arrival:'22:20',departure:'--',distance:1384,day:1,platform:4,halt:true}
  ]},
  { number:'12010', name:'Mumbai Shatabdi', type:'shatabdi', from:'NDLS', to:'BCT', depart:'06:00', arrive:'22:20', duration:'16:20', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'CC':{fare:2185,seats:56},'EC':{fare:4100,seats:52}}, route:[
    {code:'NDLS',name:'New Delhi',arrival:'--',departure:'06:00',distance:0,day:1,platform:1,halt:true},
    {code:'RTM',name:'Ratlam Junction',arrival:'13:35',departure:'13:37',distance:687,day:1,platform:2,halt:true},
    {code:'BCT',name:'Mumbai Central',arrival:'22:20',departure:'--',distance:1384,day:1,platform:4,halt:true}
  ]},
  { number:'12031', name:'ASR-NDLS Shatabdi', type:'shatabdi', from:'ASR', to:'NDLS', depart:'04:45', arrive:'11:05', duration:'06:20', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'CC':{fare:1205,seats:56},'EC':{fare:2250,seats:52}}, route:[
    {code:'ASR',name:'Amritsar Junction',arrival:'--',departure:'04:45',distance:0,day:1,platform:1,halt:true},
    {code:'LDH',name:'Ludhiana Junction',arrival:'06:50',departure:'06:52',distance:90,day:1,platform:2,halt:true},
    {code:'NDLS',name:'New Delhi',arrival:'11:05',departure:'--',distance:449,day:1,platform:4,halt:true}
  ]},
  { number:'22445', name:'Vande Bharat (CNB-LKO)', type:'vande_bharat', from:'CNB', to:'LKO', depart:'06:00', arrive:'08:15', duration:'02:15', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'CC':{fare:620,seats:56},'EC':{fare:1150,seats:52}}, route:[
    {code:'CNB',name:'Kanpur Central',arrival:'--',departure:'06:00',distance:0,day:1,platform:1,halt:true},
    {code:'LKO',name:'Lucknow NR',arrival:'08:15',departure:'--',distance:74,day:1,platform:2,halt:true}
  ]},
  { number:'22446', name:'Vande Bharat (LKO-CNB)', type:'vande_bharat', from:'LKO', to:'CNB', depart:'17:00', arrive:'19:15', duration:'02:15', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'CC':{fare:620,seats:56},'EC':{fare:1150,seats:52}}, route:[
    {code:'LKO',name:'Lucknow NR',arrival:'--',departure:'17:00',distance:0,day:1,platform:1,halt:true},
    {code:'CNB',name:'Kanpur Central',arrival:'19:15',departure:'--',distance:74,day:1,platform:2,halt:true}
  ]},
  { number:'12307', name:'NDLS-HWH Rajdhani', type:'rajdhani', from:'NDLS', to:'HWH', depart:'16:55', arrive:'09:55+1', duration:'17:00', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'1A':{fare:4890,seats:8},'2A':{fare:2925,seats:20},'3A':{fare:2040,seats:40}}, route:[
    {code:'NDLS',name:'New Delhi',arrival:'--',departure:'16:55',distance:0,day:1,platform:1,halt:true},
    {code:'ALY',name:'Prayagraj Chheoki',arrival:'22:05',departure:'22:07',distance:607,day:1,platform:2,halt:true},
    {code:'MGS',name:'Mughal Sarai',arrival:'00:25',departure:'00:27',distance:756,day:2,platform:3,halt:true},
    {code:'HWH',name:'Howrah Junction',arrival:'09:55',departure:'--',distance:1447,day:2,platform:4,halt:true}
  ]},
  { number:'12308', name:'HWH-NDLS Rajdhani', type:'rajdhani', from:'HWH', to:'NDLS', depart:'17:00', arrive:'10:00+1', duration:'17:00', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'1A':{fare:4890,seats:8},'2A':{fare:2925,seats:20},'3A':{fare:2040,seats:40}}, route:[
    {code:'HWH',name:'Howrah Junction',arrival:'--',departure:'17:00',distance:0,day:1,platform:1,halt:true},
    {code:'MGS',name:'Mughal Sarai',arrival:'01:58',departure:'02:00',distance:691,day:2,platform:3,halt:true},
    {code:'ALY',name:'Prayagraj Chheoki',arrival:'04:28',departure:'04:30',distance:840,day:2,platform:2,halt:true},
    {code:'NDLS',name:'New Delhi',arrival:'10:00',departure:'--',distance:1447,day:2,platform:4,halt:true}
  ]},
  { number:'12026', name:'SC-PUNE Shatabdi', type:'shatabdi', from:'SC', to:'PUNE', depart:'15:00', arrive:'23:00', duration:'08:00', days:['Mon','Fri'], classes:{'CC':{fare:1300,seats:56},'EC':{fare:2430,seats:52}}, route:[
    {code:'SC',name:'Secunderabad Junction',arrival:'--',departure:'15:00',distance:0,day:1,platform:1,halt:true},
    {code:'SUR',name:'Solapur Junction',arrival:'19:15',departure:'19:17',distance:280,day:1,platform:3,halt:true},
    {code:'PUNE',name:'Pune Junction',arrival:'23:00',departure:'--',distance:542,day:1,platform:4,halt:true}
  ]},
  { number:'22437', name:'VB-1 (NDLS-BSB 2)', type:'vande_bharat', from:'NDLS', to:'BSB', depart:'06:00', arrive:'14:00', duration:'08:00', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'CC':{fare:1885,seats:56},'EC':{fare:3520,seats:52}}, route:[
    {code:'NDLS',name:'New Delhi',arrival:'--',departure:'06:00',distance:0,day:1,platform:1,halt:true},
    {code:'PRYJ',name:'Prayagraj Junction',arrival:'10:45',departure:'10:47',distance:635,day:1,platform:2,halt:true},
    {code:'BSB',name:'Banaras',arrival:'14:00',departure:'--',distance:820,day:1,platform:3,halt:true}
  ]},
  { number:'22438', name:'VB-2 (BSB-NDLS 2)', type:'vande_bharat', from:'BSB', to:'NDLS', depart:'15:00', arrive:'23:00', duration:'08:00', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'CC':{fare:1885,seats:56},'EC':{fare:3520,seats:52}}, route:[
    {code:'BSB',name:'Banaras',arrival:'--',departure:'15:00',distance:0,day:1,platform:1,halt:true},
    {code:'PRYJ',name:'Prayagraj Junction',arrival:'17:55',departure:'17:57',distance:185,day:1,platform:2,halt:true},
    {code:'NDLS',name:'New Delhi',arrival:'23:00',departure:'--',distance:820,day:1,platform:3,halt:true}
  ]},
  { number:'12037', name:'Kathgodam-Jan Shatabdi', type:'jan_shatabdi', from:'NDLS', to:'KGM', depart:'06:15', arrive:'23:00', duration:'16:45', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'CC':{fare:860,seats:56},'2S':{fare:320,seats:180}}, route:[
    {code:'NDLS',name:'New Delhi',arrival:'--',departure:'06:15',distance:0,day:1,platform:1,halt:true},
    {code:'MB',name:'Moradabad Junction',arrival:'10:25',departure:'10:27',distance:268,day:1,platform:2,halt:true},
    {code:'HDO',name:'Haldwani',arrival:'14:30',departure:'14:32',distance:420,day:1,platform:3,halt:true},
    {code:'KGM',name:'Kathgodam',arrival:'23:00',departure:'--',distance:435,day:1,platform:4,halt:true}
  ]},
  { number:'12038', name:'Kathgodam-Jan Shatabdi', type:'jan_shatabdi', from:'KGM', to:'NDLS', depart:'06:30', arrive:'23:15', duration:'16:45', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'CC':{fare:860,seats:56},'2S':{fare:320,seats:180}}, route:[
    {code:'KGM',name:'Kathgodam',arrival:'--',departure:'06:30',distance:0,day:1,platform:1,halt:true},
    {code:'HDO',name:'Haldwani',arrival:'07:10',departure:'07:12',distance:15,day:1,platform:2,halt:true},
    {code:'MB',name:'Moradabad Junction',arrival:'13:10',departure:'13:12',distance:167,day:1,platform:3,halt:true},
    {code:'NDLS',name:'New Delhi',arrival:'23:15',departure:'--',distance:435,day:1,platform:4,halt:true}
  ]},
  { number:'12053', name:'Haridwar Jan Shatabdi', type:'jan_shatabdi', from:'NDLS', to:'HRW', depart:'06:00', arrive:'12:00', duration:'06:00', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'CC':{fare:690,seats:56},'2S':{fare:250,seats:180}}, route:[
    {code:'NDLS',name:'New Delhi',arrival:'--',departure:'06:00',distance:0,day:1,platform:1,halt:true},
    {code:'AGC',name:'Agra Cantt',arrival:'08:25',departure:'08:27',distance:189,day:1,platform:2,halt:true},
    {code:'HRW',name:'Haridwar Junction',arrival:'12:00',departure:'--',distance:365,day:1,platform:3,halt:true}
  ]},
  { number:'12054', name:'Haridwar Jan Shatabdi', type:'jan_shatabdi', from:'HRW', to:'NDLS', depart:'14:00', arrive:'20:00', duration:'06:00', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'CC':{fare:690,seats:56},'2S':{fare:250,seats:180}}, route:[
    {code:'HRW',name:'Haridwar Junction',arrival:'--',departure:'14:00',distance:0,day:1,platform:1,halt:true},
    {code:'AGC',name:'Agra Cantt',arrival:'17:55',departure:'17:57',distance:176,day:1,platform:2,halt:true},
    {code:'NDLS',name:'New Delhi',arrival:'20:00',departure:'--',distance:365,day:1,platform:3,halt:true}
  ]},
  { number:'12041', name:'Howrah-Shatabdi Express', type:'jan_shatabdi', from:'HWH', to:'BBS', depart:'06:00', arrive:'16:30', duration:'10:30', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'CC':{fare:1120,seats:56},'2S':{fare:420,seats:180}}, route:[
    {code:'HWH',name:'Howrah Junction',arrival:'--',departure:'06:00',distance:0,day:1,platform:1,halt:true},
    {code:'KGP',name:'Kharagpur Junction',arrival:'08:05',departure:'08:07',distance:129,day:1,platform:2,halt:true},
    {code:'BAM',name:'Berhampur',arrival:'12:15',departure:'12:17',distance:380,day:1,platform:3,halt:true},
    {code:'BBS',name:'Bhubaneswar',arrival:'16:30',departure:'--',distance:463,day:1,platform:4,halt:true}
  ]},
  { number:'22351', name:'Patna-Ranchi Superfast', type:'superfast', from:'PTA', to:'RNC', depart:'22:30', arrive:'06:20+1', duration:'07:50', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'3A':{fare:810,seats:40},'SL':{fare:290,seats:100}}, route:[
    {code:'PTA',name:'Patna Junction',arrival:'--',departure:'22:30',distance:0,day:1,platform:1,halt:true},
    {code:'GAYA',name:'Gaya Junction',arrival:'00:45',departure:'00:47',distance:121,day:2,platform:2,halt:true},
    {code:'RNC',name:'Ranchi Junction',arrival:'06:20',departure:'--',distance:335,day:2,platform:3,halt:true}
  ]},
  { number:'22352', name:'Ranchi-Patna Superfast', type:'superfast', from:'RNC', to:'PTA', depart:'20:30', arrive:'04:20+1', duration:'07:50', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'3A':{fare:810,seats:40},'SL':{fare:290,seats:100}}, route:[
    {code:'RNC',name:'Ranchi Junction',arrival:'--',departure:'20:30',distance:0,day:1,platform:1,halt:true},
    {code:'GAYA',name:'Gaya Junction',arrival:'02:10',departure:'02:12',distance:214,day:2,platform:2,halt:true},
    {code:'PTA',name:'Patna Junction',arrival:'04:20',departure:'--',distance:335,day:2,platform:3,halt:true}
  ]},
  { number:'22621', name:'Rameswaram Express', type:'superfast', from:'MAS', to:'RMM', depart:'22:30', arrive:'12:00+1', duration:'13:30', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'2A':{fare:1680,seats:20},'3A':{fare:1170,seats:40},'SL':{fare:315,seats:100}}, route:[
    {code:'MAS',name:'Chennai Central',arrival:'--',departure:'22:30',distance:0,day:1,platform:1,halt:true},
    {code:'TPJ',name:'Tiruchirappalli Junction',arrival:'04:50',departure:'04:55',distance:330,day:2,platform:2,halt:true},
    {code:'MDU',name:'Madurai Junction',arrival:'07:45',departure:'07:50',distance:487,day:2,platform:3,halt:true},
    {code:'RMM',name:'Rameswaram',arrival:'12:00',departure:'--',distance:675,day:2,platform:4,halt:true}
  ]},
  { number:'22622', name:'Rameswaram Express', type:'superfast', from:'RMM', to:'MAS', depart:'21:15', arrive:'10:45+1', duration:'13:30', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'2A':{fare:1680,seats:20},'3A':{fare:1170,seats:40},'SL':{fare:315,seats:100}}, route:[
    {code:'RMM',name:'Rameswaram',arrival:'--',departure:'21:15',distance:0,day:1,platform:1,halt:true},
    {code:'MDU',name:'Madurai Junction',arrival:'01:10',departure:'01:15',distance:188,day:2,platform:2,halt:true},
    {code:'TPJ',name:'Tiruchirappalli Junction',arrival:'03:55',departure:'04:00',distance:345,day:2,platform:3,halt:true},
    {code:'MAS',name:'Chennai Central',arrival:'10:45',departure:'--',distance:675,day:2,platform:4,halt:true}
  ]},
  { number:'17230', name:'Sabari Express', type:'superfast', from:'CHZ', to:'TVC', depart:'11:00', arrive:'11:40+1', duration:'24:40', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'2A':{fare:2340,seats:20},'3A':{fare:1630,seats:40},'SL':{fare:435,seats:100}}, route:[
    {code:'SC',name:'Secunderabad Junction',arrival:'--',departure:'11:00',distance:0,day:1,platform:1,halt:true},
    {code:'KTYM',name:'Kottayam',arrival:'07:30',departure:'07:32',distance:1187,day:2,platform:2,halt:true},
    {code:'TVC',name:'Thiruvananthapuram Central',arrival:'11:40',departure:'--',distance:1512,day:2,platform:4,halt:true}
  ]},
  { number:'17229', name:'Sabari Express', type:'superfast', from:'TVC', to:'SC', depart:'19:15', arrive:'19:45+1', duration:'24:30', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'2A':{fare:2340,seats:20},'3A':{fare:1630,seats:40},'SL':{fare:435,seats:100}}, route:[
    {code:'TVC',name:'Thiruvananthapuram Central',arrival:'--',departure:'19:15',distance:0,day:1,platform:1,halt:true},
    {code:'KTYM',name:'Kottayam',arrival:'21:45',departure:'21:47',distance:325,day:1,platform:2,halt:true},
    {code:'SC',name:'Secunderabad Junction',arrival:'19:45',departure:'--',distance:1512,day:2,platform:4,halt:true}
  ]},
  { number:'12675', name:'Kovai Express', type:'superfast', from:'MAS', to:'CBE', depart:'22:30', arrive:'06:00+1', duration:'07:30', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'2A':{fare:1210,seats:20},'3A':{fare:850,seats:40},'SL':{fare:245,seats:100}}, route:[
    {code:'MAS',name:'Chennai Central',arrival:'--',departure:'22:30',distance:0,day:1,platform:1,halt:true},
    {code:'SA',name:'Salem Junction',arrival:'02:30',departure:'02:32',distance:345,day:2,platform:2,halt:true},
    {code:'CBE',name:'Coimbatore Junction',arrival:'06:00',departure:'--',distance:510,day:2,platform:3,halt:true}
  ]},
  { number:'12676', name:'Kovai Express', type:'superfast', from:'CBE', to:'MAS', depart:'21:00', arrive:'04:30+1', duration:'07:30', days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], classes:{'2A':{fare:1210,seats:20},'3A':{fare:850,seats:40},'SL':{fare:245,seats:100}}, route:[
    {code:'CBE',name:'Coimbatore Junction',arrival:'--',departure:'21:00',distance:0,day:1,platform:1,halt:true},
    {code:'SA',name:'Salem Junction',arrival:'00:30',departure:'00:32',distance:165,day:2,platform:2,halt:true},
    {code:'MAS',name:'Chennai Central',arrival:'04:30',departure:'--',distance:510,day:2,platform:3,halt:true}
  ]},
  { number:'12829', name:'Bhubaneswar Express', type:'superfast', from:'MAS', to:'BBS', depart:'23:00', arrive:'08:30+2', duration:'33:30', days:['Mon','Thu'], classes:{'2A':{fare:2790,seats:20},'3A':{fare:1940,seats:40},'SL':{fare:520,seats:100}}, route:[
    {code:'MAS',name:'Chennai Central',arrival:'--',departure:'23:00',distance:0,day:1,platform:1,halt:true},
    {code:'VSKP',name:'Visakhapatnam',arrival:'10:45',departure:'10:50',distance:780,day:2,platform:2,halt:true},
    {code:'BBS',name:'Bhubaneswar',arrival:'08:30',departure:'--',distance:1223,day:2,platform:4,halt:true}
  ]},
  { number:'12830', name:'Bhubaneswar Express', type:'superfast', from:'BBS', to:'MAS', depart:'21:30', arrive:'07:00+2', duration:'33:30', days:['Tue','Fri'], classes:{'2A':{fare:2790,seats:20},'3A':{fare:1940,seats:40},'SL':{fare:520,seats:100}}, route:[
    {code:'BBS',name:'Bhubaneswar',arrival:'--',departure:'21:30',distance:0,day:1,platform:1,halt:true},
    {code:'VSKP',name:'Visakhapatnam',arrival:'03:10',departure:'03:15',distance:443,day:2,platform:2,halt:true},
    {code:'MAS',name:'Chennai Central',arrival:'07:00',departure:'--',distance:1223,day:2,platform:4,halt:true}
  ]},
];
module.exports = TRAINS_DB;
