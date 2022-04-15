import { useEffect,useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { changeText, changeIncludeHTML} from "../../redux/text/textSlice";
import Loading from "../Loading";
import "./styles.css"

function Main() {
  const dispatch = useDispatch();
  const paragraphValue = useSelector((state) => state.text.value);
  const includeHtml = useSelector((state) => state.text.includeHTML);

  const [text,setText]=useState("")
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let textType="text"
    const getText = async () => {
      if (includeHtml === "false") {
        textType = "text";
      } 
      else{
        textType = "html";
      }

      const response = await axios.get(
        `https://baconipsum.com/api/?type=all-meat&paras=${paragraphValue}&format=${textType}&start-with-lorem=1`
      );
      // response.data.split("\n");  // css de düzeltilmeye çalışıldı
      // setText(response.data.split("\n"))
      setText(response.data)
      setIsLoading(false)
    };
    getText();
  }, [paragraphValue, includeHtml]);

  if(isLoading){
    return <Loading/>
  }
  return (
    <div>
      <div className="main">
        <label style={{color:"#ffefba"}}>Paragraphs</label>
        <input
          className="input"
          value={paragraphValue}
          type="number"
          onChange={(e) => dispatch(changeText(e.target.value))}
          min={1}
        />
        
        <label style={{color:"#ffefba"}}>Include HTML</label>
        <select className="option" onChange={(e) => dispatch(changeIncludeHTML(e.target.value))}>
          <option className="option1" value="false">No</option>
          <option className="option2" value="true">Yes</option>
        </select>
      </div>

      <p className="pre">{text}</p>
      
    </div>
  );
}

export default Main;
