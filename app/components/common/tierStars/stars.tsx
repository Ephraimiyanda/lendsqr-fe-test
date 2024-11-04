import Image from "next/image";

const UserTierStars = ({ userTier }: { userTier: number }) => {
  const maxTier = 3;

  // Validate userTier to be within range
  const validUserTier = Math.max(0, Math.min(userTier, maxTier));
  const filledStars = Array(validUserTier).fill("filled");
  const outlinedStars = Array(maxTier - validUserTier).fill("outlined");

  return (
    <div className="row-container gap-small">
      {filledStars.map((_, index) => (
        <Image
          key={`filled-${index}`}
          alt="star"
          src="/images/icons/star-filled.svg"
          width={16}
          height={16}
        />
      ))}
      {outlinedStars.map((_, index) => (
        <Image
          key={`outlined-${index}`}
          alt="star"
          src="/images/icons/star-outline.svg"
          width={16}
          height={16}
        />
      ))}
    </div>
  );
};

export default UserTierStars;
