import { departments } from "../data/departments.js";

export function DepartmentLinks() {
  return (
    <nav
      className="department-links"
      aria-label="Our departments"
      data-department-addition
    >
      {departments.map((department, index) => (
        <a href={`/services/#department-${department.id}`} key={department.id}>
          <span className="department-links__number">0{index + 1}</span>
          <h3>{department.name}</h3>
          <p>{department.summary}</p>
          <span className="department-links__action">Explore department</span>
        </a>
      ))}
    </nav>
  );
}
