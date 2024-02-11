import useStore from "../../core/store";
import './DrawerPlaneItems.css';

const DrawerPlaneItems = () => {
  const availableItems = useStore(s => s.item.available);
  console.log("HII")
  return (
    <>
      {Object.values(availableItems).map(item =>
        <button className="items-drawer__button">
          {item.name}
        </button>
      )}
    </>
  )
}

export default DrawerPlaneItems;