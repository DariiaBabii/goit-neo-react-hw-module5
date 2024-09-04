import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <div>
    <h1>Сторінка не знайдена</h1>
    <p>На жаль, ми не можемо знайти цю сторінку.</p>
    <Link to="/">Перейти на головну</Link>
  </div>
);

export default NotFoundPage;
