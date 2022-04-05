 //Alternate scenario Search 
 const [searchInput, setSearchInput] = useState('');
 const [filteredResults, setFilteredResults] = useState([]);

 const searchItems = (searchValue) => {
   setSearchInput(searchValue)
   if (searchInput !== '') {
       const filteredData = tripsData.filter((item) => {
           return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
       })
       setFilteredResults(filteredData)
   }
   else{
       setFilteredResults(tripsData)
   }
 }