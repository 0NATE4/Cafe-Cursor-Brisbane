type CardCoverProps = {
  coverImage?: string;
  name: string;
};

export function CardCover({ coverImage, name }: CardCoverProps) {
  if (coverImage) {
    return <img className="card-cover-image" src={coverImage} alt={`${name} project cover`} />;
  }

  return (
    <div className="card-cover-default" aria-hidden="true">
      <img src="/brand/CUBE_2D_DARK.svg" alt="" />
    </div>
  );
}
