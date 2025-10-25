import React, { useMemo, useState } from "react";
import plants from "../../data/plants";
import PlantCard from "../../components/PlantCard/PlantCard";
import "./AllPlants.css";

export default function AllPlants({ cart, onAddRemoveCart }) {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  const filtered = useMemo(() => {
    let list = [...plants];

    if (category !== "All") list = list.filter((p) => p.category === category);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "popularity") list.sort((a, b) => b.popularity - a.popularity);

    return list;
  }, [category, search, sort]);

  return (
    <div className="allplants-container">
      <h1 className="page-title">🌿 All Plants</h1>

      <div className="filters-row">
        <label>
          Category:{" "}
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="All">All</option>
            <option value="Indoor">Indoor</option>
            <option value="Outdoor">Outdoor</option>
            <option value="Succulent">Succulent</option>
            <option value="Flowering">Flowering</option>
          </select>
        </label>

        <label>
          Search:{" "}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name"
          />
        </label>

        <label>
          Sort:{" "}
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="default">Default</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="popularity">Popularity</option>
          </select>
        </label>
      </div>

      <main className="plants-grid">
        {filtered.length === 0 ? (
          <p className="no-results">No plants found.</p>
        ) : (
          filtered.map((p) => (
            <PlantCard
              key={p.id}
              plant={p}
              inCart={cart.some((c) => c.id === p.id)}
              onAddToCart={onAddRemoveCart}
            />
          ))
        )}
      </main>
    </div>
  );
}
