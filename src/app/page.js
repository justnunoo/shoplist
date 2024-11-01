"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [category, setCategory] = useState("");
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/view-items`);
      const result = await response.json();
      setAllData(result.items || []);
      setData(result.items || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCatgories = async () => {
    try {
      const response = await fetch("/api/item-categories");
      const result = await response.json();
      setCategoryData(result.categories || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCatgories();
  }, []);

  const handleCategoryFilter = (e) => {
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory);

    if (selectedCategory === "all") {
      setData(allData);
    } else {
      const filtered = allData.filter((item) => item.category === selectedCategory);
      setData(filtered);
    }
  };

  useEffect(() => {
    setButtonEnabled(newItem.trim().length > 0);
  }, [newItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("/api/add-item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newItem, category }),
      });

      if (response.ok) {
        setNewItem("");
        fetchData();
      } else {
        const errorData = await response.json();
        console.error(errorData.error || "Failed to add item.");
      }
    } catch (error) {
      console.error("Error submitting item:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/delete-item`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        fetchData();
      } else {
        const errorData = await response.json();
        console.error(errorData.error || "Failed to delete item.");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">To-Do List</h1>

      <select name="filterCategory" value={selectedCategory} onChange={handleCategoryFilter}>
        <option value="all">All</option>
        {categoryData.map((categoryObj, index) => (
          <option key={index} value={categoryObj.category}>{categoryObj.category}</option>
        ))}
      </select>

      {data.length < 1 ? (
        <h3 style={{ marginBottom: "100px" }}>
          No items in the list. Add a new item to get started!
        </h3>
      ) : (
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              {item.name}
              <button onClick={() => handleDelete(item.id)} className="delete-btn">Delete</button>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Input item"
          name="newItem"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />

        <label>Select a category:</label>
        {/* <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          {categoryData.map((categoryObj, index) => (
            <option key={index} value={categoryObj.category}>{categoryObj.category}</option>
          ))}
        </select> */}
        <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option className="select2" value="normal lining">Normal Lining</option>
          <option className="select2" value="thick lining">Thick lining</option>
          <option className="select2" value="thread">Thread</option>
          <option className="select2" value="bridal satin">Bridal satin</option>
          <option className="select2" value="normal satin">Normal satin</option>
          <option className="select2" value="jacket zip">Jacket zip</option>
          <option className="select2" value="uniform">Uniform</option>
        </select>

        <button type="submit" disabled={!buttonEnabled || loading}>
          {loading ? "Loading..." : "Add item"}
        </button>
      </form>

      <style jsx>{`
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: #ffffff;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    border-radius: 8px;
    width: 100%;
    max-width: 400px;
    margin: auto;
    position : relative;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 20px 0;
    width: 100%;
    max-height : 390px;
    overflow-y : auto;
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin-bottom: 10px;
    background: #f8f9fa;
    border-radius: 4px;
    font-size: 16px;
    transition: background-color 0.3s;
  }

  li:hover {
    background-color: #e2e6ea;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }

  input[type="text"] {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    width: 100%;
  }

  select {
    padding : 10px;
  }

  .select2 {
    font-style : italic;
    margin : 5px 0;
  }

  button {
    padding: 10px;
    font-size: 16px;
    color: #ffffff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:disabled {
    background-color: #d3d3d3;
    cursor: not-allowed;
  }

  button:hover:not(:disabled) {
    background-color: #0056b3;
  }

  .delete-btn {
    padding: 5px 10px;
    font-size: 14px;
    color: #ffffff;
    background-color: #dc3545;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .delete-btn:hover {
    background-color: #c82333;
  }

  h3 {
    text-align: center;
    color: #555;
  }
`}</style>


    </div>
  );
}
