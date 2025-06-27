import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const Content = () => {
  let [items, setItems] = useState([
    { id: 1, label: "HTML & CSS", checked: true },
    { id: 2, label: "Javascript", checked: true },
    { id: 3, label: "React JS", checked: false },
  ]);
  let [newItem, setNewItem] = useState("");
  let [isEditing, setIsEditing] = useState(false);
  let [activeId, setActiveId] = useState(null);

  let handleCheck = (id) => {
    let newListItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(newListItems);
  };

  let handleUpdate = (id) => {
    setIsEditing(true);
    setActiveId(id);
    setNewItem(items.find((item) => item.id === id).label);
  };

  let handleDelete = (id) => {
    if (isEditing && activeId === id) {
      setNewItem("");
      setActiveId(null);
      setIsEditing(false);
    }

    let newListItems = items
      .filter((item) => item.id !== id)
      .map((item, index) => {
        return { ...item, id: index + 1 };
      });
    setItems(newListItems);
  };

  let handleSaveOrUpdateItem = () => {
    if (newItem) {
      if (isEditing) {
        // Update
        let newListItems = items.map((item) => {
          return item.id === activeId ? { ...item, label: newItem } : item;
        });
        setItems(newListItems);
        setNewItem("");
        setActiveId(null);
        setIsEditing(false);
      } else {
        // Save
        setItems([
          ...items,
          { id: items.length + 1, label: newItem, checked: false },
        ]);
        setNewItem("");
      }
    }
  };

  let handleCancel = () => {
    setNewItem("");
    setIsEditing(false);
    setActiveId(null);
  };

  return (
    <main>
      <div>
        <input
          type="text"
          placeholder="Enter your plans"
          onChange={(e) => {
            setNewItem(e.target.value);
          }}
          value={newItem}
        />
        <button onClick={() => handleSaveOrUpdateItem()}>
          {isEditing ? "Save" : "Add"}
        </button>
        {isEditing && <button onClick={() => handleCancel()}>Cancel</button>}
      </div>
      <ul>
        {items.map((item) => {
          return (
            <li key={item.id} className="item">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleCheck(item.id)}
              />
              <label> {item.label} </label>
              <FaEdit
                id="edit"
                role="button"
                tabIndex={0}
                onClick={() => handleUpdate(item.id)}
              />
              <MdDeleteOutline
                id="delete"
                role="button"
                tabIndex={0}
                onClick={() => handleDelete(item.id)}
              />
            </li>
          );
        })}
      </ul>
    </main>
  );
};
export default Content;
