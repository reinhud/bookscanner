export default function PageHeader({ title }: { title: string }) {
    return (
        <div className="page-header">
            <h1 className="page-header__title">{title}</h1>
        </div>
    );
}
