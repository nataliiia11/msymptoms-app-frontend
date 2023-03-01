import { Card } from "antd";
import DropdownMenu from "../dropdown/DropdownMenu";
import "./Symptom.scss";

const Symptom = ({
  symptom,
  deleteSymptom,
  updateSymptom,
  bodyPart,
  name,
  intensity,
  handleInputChange,
}) => {
  const date = new Date(symptom.date);
  const formattedDate = date
    .toLocaleDateString("default", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, ".");

  return (
    <div>
      <Card
        className="cardcontainer"
        title={name}
        extra={
          <DropdownMenu
            symptom={symptom}
            deleteSymptom={deleteSymptom}
            updateSymptom={updateSymptom}
            handleInputChange={handleInputChange}
          />
        }
      >
        <div className="symptomicons"></div>
        <p>Creation date:</p> {formattedDate}
        <p>Intensity:</p> {intensity}
        <p>Body Part: </p> {bodyPart}
      </Card>
    </div>
  );
};

export default Symptom;
