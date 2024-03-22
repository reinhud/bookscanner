from src.models.books.books import BookModel

# Books all users should read
mock_recommendations = [
    BookModel(
        title="East of Eden",
        authors=["John Steinbeck"],
        isbn13="9781440631320",
        isbn10="1440631328",
        pageCount=612,
        publishedDate="2002-02-05",
        categories=None,
        averageRating=4.5,
        image_url="http://books.google.com/books/content?id=OPy6E5ZhXs0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",  # noqaE501
        description="A masterpiece of Biblical scope, and the magnum opus of one of America’s most enduring authors, in a commemorative hardcover edition In his journal, Nobel Prize winner John Steinbeck called East of Eden \"the first book,\" and indeed it has the primordial power and simplicity of myth. Set in the rich farmland of California's Salinas Valley, this sprawling and often brutal novel follows the intertwined destinies of two families—the Trasks and the Hamiltons—whose generations helplessly reenact the fall of Adam and Eve and the poisonous rivalry of Cain and Abel. The masterpiece of Steinbeck’s later years, East of Eden is a work in which Steinbeck created his most mesmerizing characters and explored his most enduring themes: the mystery of identity, the inexplicability of love, and the murderous consequences of love's absence. Adapted for the 1955 film directed by Elia Kazan introducing James Dean, and read by thousands as the book that brought Oprah’s Book Club back, East of Eden has remained vitally present in American culture for over half a century.",  # noqaE501
        src="google_books",
    ),
    BookModel(
        title="Slaughterhouse-Five",
        authors=["Kurt Vonnegut"],
        isbn13="9780440339069",
        isbn10="0440339065",
        pageCount=286,
        publishedDate="2009-08-11",
        categories=None,
        averageRating=4,
        image_url="http://books.google.com/books/content?id=FM4y7N1kM9AC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",  # noqaE501
        description="A special fiftieth anniversary edition of Kurt Vonnegut’s masterpiece, “a desperate, painfully honest attempt to confront the monstrous crimes of the twentieth century” (Time), featuring a new introduction by Kevin Powers, author of the National Book Award finalist The Yellow Birds Selected by the Modern Library as one of the 100 best novels of all time Slaughterhouse-Five, an American classic, is one of the world’s great antiwar books. Centering on the infamous World War II firebombing of Dresden, the novel is the result of what Kurt Vonnegut described as a twenty-three-year struggle to write a book about what he had witnessed as an American prisoner of war. It combines historical fiction, science fiction, autobiography, and satire in an account of the life of Billy Pilgrim, a barber’s son turned draftee turned optometrist turned alien abductee. As Vonnegut had, Billy experiences the destruction of Dresden as a POW. Unlike Vonnegut, he experiences time travel, or coming “unstuck in time.” An instant bestseller, Slaughterhouse-Five made Kurt Vonnegut a cult hero in American literature, a reputation that only strengthened over time, despite his being banned and censored by some libraries and schools for content and language. But it was precisely those elements of Vonnegut’s writing—the political edginess, the genre-bending inventiveness, the frank violence, the transgressive 'wit—that' have inspired generations of readers not just to look differently at the world around them but to find the confidence to say something about it. Authors as wide-ranging as Norman Mailer, John Irving, Michael Crichton, Tim O’Brien, Margaret Atwood, Elizabeth Strout, David Sedaris, Jennifer Egan, and J. K. Rowling have all found inspiration in Vonnegut’s words. Jonathan Safran Foer has described Vonnegut as “the kind of writer who made people—young people especially—want to write.” George Saunders has declared Vonnegut to be “the great, urgent, passionate American writer of our century, who offers us . . . a model of the kind of compassionate thinking that might yet save us from ourselves.” More than fifty years after its initial publication at the height of the Vietnam War, Vonnegut’s portrayal of political disillusionment, PTSD, and postwar anxiety feels as relevant, darkly humorous, and profoundly affecting as ever, an enduring beacon through our own era’s uncertainties.",  # noqaE501
        src="google_books",
    ),
    BookModel(
        title="The Count of Monte-Cristo",
        authors=["Alexandre Dumas"],
        isbn13=None,
        isbn10=None,
        pageCount=504,
        publishedDate="1846",
        categories=None,
        averageRating=4,
        image_url="http://books.google.com/books/content?id=RyEEAAAAQAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",  # noqaE501
        description="The Count of Monte Cristo (French: Le Comte de Monte-Cristo) is an adventure novel by French author Alexandre Dumas completed in 1844. It is one of the author's most popular works, along with The Three Musketeers. Like many of his novels, it is expanded from plot outlines suggested by his collaborating ghostwriter Auguste Maquet.The story takes place in France, Italy, and islands in the Mediterranean during the historical events of 1815-1839: the era of the Bourbon Restoration through the reign of Louis-Philippe of France. It begins just before the Hundred Days period (when Napoleon returned to power after his exile). The historical setting is a fundamental element of the book, an adventure story primarily concerned with themes of hope, justice, vengeance, mercy, and forgiveness. It centres around a man who is wrongfully imprisoned, escapes from jail, acquires a fortune, and sets about getting revenge on those responsible for his imprisonment. However, his plans have devastating consequences for the innocent as well as the guilty. In addition, it is a story that involves romance, loyalty, betrayal, and selfishness, shown throughout the story as characters slowly reveal their true inner nature.The book is considered a literary classic today. According to Luc Sante, \"The Count of Monte Cristo has become a fixture of Western civilization's literature, as inescapable and immediately identifiable as Mickey Mouse, Noah's flood, and the story of Little Red Riding Hood.",  # noqaE501
        src="google_books",
    ),
    BookModel(
        title="The 272",
        authors=["Rachel L. Swarns"],
        isbn13="9780399590887",
        isbn10="0399590889",
        pageCount=361,
        publishedDate="2023-06-13",
        categories=None,
        averageRating=None,
        image_url="http://books.google.com/books/content?id=XISHEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",  # noqaE501
        description="“An absolutely essential addition to the history of the Catholic Church, whose involvement in New World slavery sustained the Church and, thereby, helped to entrench enslavement in American society.”—Annette Gordon-Reed, Pulitzer Prize–winning author of The Hemingses of Monticello and On Juneteenth New York Times Book Review Editors’ Choice • Longlisted for the Andrew Carnegie Medal A BEST BOOK OF THE YEAR: The New Yorker, The New York Times Book Review, The Washington Post, Time, Chicago Public Library, Kirkus Reviews In 1838, a group of America’s most prominent Catholic priests sold 272 enslaved people to save their largest mission project, what is now Georgetown University. In this groundbreaking account, journalist, author, and professor Rachel L. Swarns follows one family through nearly two centuries of indentured servitude and enslavement to uncover the harrowing origin story of the Catholic Church in the United States. Through the saga of the Mahoney family, Swarns illustrates how the Church relied on slave labor and slave sales to sustain its operations and to help finance its expansion. The story begins with Ann Joice, a free Black woman and the matriarch of the Mahoney family. Joice sailed to Maryland in the late 1600s as an indentured servant, but her contract was burned and her freedom stolen. Her descendants, who were enslaved by Jesuit priests, passed down the story of that broken promise for centuries. One of those descendants, Harry Mahoney, saved lives and the church's money in the War of 1812, but his children, including Louisa and Anna, were put up for sale in 1838. One daughter managed to escape, but the other was sold and shipped to Louisiana. Their descendants would remain apart until Rachel Swarns's reporting in The New York Times finally reunited them. They would go on to join other GU272 descendants who pressed Georgetown and the Catholic Church to make amends, prodding the institutions to break new ground in the movement for reparations and reconciliation in America. Swarns's journalism has already started a national conversation about universities with ties to slavery. The 272 tells an even bigger story, not only demonstrating how slavery fueled the growth of the American Catholic Church but also shining a light on the enslaved people whose forced labor helped to build the largest religious denomination in the nation.",  # noqaE501
        src="google_books",
    ),
    BookModel(
        title="A Day in the Life of Abed Salama",
        authors=["Nathan Thrall"],
        isbn13="9781802060058",
        isbn10="1802060057",
        pageCount=227,
        publishedDate="2023-10-03",
        categories=None,
        averageRating=None,
        image_url="http://books.google.com/books/content?id=T1OlEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",  # noqaE501
        description="'This brilliant and heartbreaking book is a masterpiece. It reads like a novel, yet is all sadly true. I finished it in tears' James Rebanks A gripping, intimate story of one heartbreaking day in Palestine that reveals lives, loves, enmities, and histories in violent collision Milad is five years old and excited for his school trip to a theme park on the outskirts of Jerusalem, but tragedy awaits: his bus is involved in a horrific accident. His father, Abed, rushes to the chaotic site, only to find Milad has already been taken away. Abed sets off on a journey to learn Milad's fate, navigating a maze of physical, emotional, and bureaucratic obstacles he must face as a Palestinian. Interwoven with Abed's odyssey are the stories of Jewish and Palestinian characters whose lives and pasts unexpectedly converge: a kindergarten teacher and a mechanic who rescue children from the burning bus; an Israeli army commander and a Palestinian official who confront the aftermath at the scene of the crash; a settler paramedic; ultra-Orthodox emergency service workers; and two mothers who each hope to claim one severely injured boy. A Day in the Life of Abed Salama is a deeply immersive, stunningly detailed portrait of life in Israel and Palestine, and an illumination of the reality of one of the most contested places on earth.",  # noqaE501
        src="google_books",
    ),
    BookModel(
        title="A Living Remedy",
        authors=["Nicole Chung"],
        isbn13="9780063031630",
        isbn10="0063031639",
        pageCount=194,
        publishedDate="2023-04-04",
        categories=None,
        averageRating=None,
        image_url="http://books.google.com/books/content?id=r-SBEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",  # noqaE501
        description="A Most Anticipated Book of 2023 from: Dallas Morning News * Today.com * Good Housekeeping * Time * The Rumpus * The Week * Salon * Seattle Times * Electric Literature * Bookpage * The Millions * Elle.com * Washington Post * Book Riot * Lit Hub * NPR's Here & Now * Ms. Magazine * Town & Country * New York Times * USA Today * Sunset From the bestselling author of ALL YOU CAN EVER KNOW comes a searing memoir of family, class and grief—a daughter’s search to understand the lives her adoptive parents led, the life she forged as an adult, and the lives she’s lost. In this country, unless you attain extraordinary wealth, you will likely be unable to help your loved ones in all the ways you’d hoped. You will learn to live with the specific, hollow guilt of those who leave hardship behind, yet are unable to bring anyone else with them. Nicole Chung couldn’t hightail it out of her overwhelmingly white Oregon hometown fast enough. As a scholarship student at a private university on the East Coast, no longer the only Korean she knew, she found community and a path to the life she'd long wanted. But the middle class world she begins to raise a family in – where there are big homes, college funds, nice vacations – looks very different from the middle class world she thought she grew up in, where paychecks have to stretch to the end of the week, health insurance is often lacking, and there are no safety nets. When her father dies at only sixty-seven, killed by diabetes and kidney disease, Nicole feels deep grief as well as rage, knowing that years of precarity and lack of access to healthcare contributed to his early death. And then the unthinkable happens – less than a year later, her beloved mother is diagnosed with cancer, and the physical distance between them becomes insurmountable as COVID-19 descends upon the world. Exploring the enduring strength of family bonds in the face of hardship and tragedy, A Living Remedy examines what it takes to reconcile the distance between one life, one home, and another – and sheds needed light on some of the most persistent and grievous inequalities in American society.",  # noqaE501
        src="google_books",
    ),
]
